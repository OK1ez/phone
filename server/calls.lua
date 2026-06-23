local CALL_TIMEOUT_MS <const> = 30000

local callsBySource = {}
local busyNumbers = {}

---Checks if a player has a phone with the given phoneNumber in their inventory
---@param serverId integer
---@param phoneNumber string
---@return boolean
local function hasPhoneWithNumber(serverId, phoneNumber)
    local items = exports.ox_inventory:GetInventoryItems(serverId)
    if not items then return false end
    for _, item in pairs(items) do
        local metadata = item.metadata or {}
        if item.name == 'phone' and tostring(metadata.phoneNumber) == phoneNumber then
            return true
        end
    end
    return false
end

---Resolves participant display info (name, avatar) for the recipient of an incoming call
---@param ownPhoneNumber string
---@param otherPhoneNumber string
---@return table
local function resolveCallParticipant(ownPhoneNumber, otherPhoneNumber)
    local cloud = MySQL.single.await('SELECT `cloudId` FROM `phone_clouds` WHERE `phoneNumber` = ? LIMIT 1', {
        ownPhoneNumber
    })

    if cloud then
        local contact = MySQL.single.await(
            'SELECT `name`, `avatar` FROM `phone_contacts` WHERE `cloudId` = ? AND `phoneNumber` = ? LIMIT 1', {
                cloud.cloudId, otherPhoneNumber
            })

        if contact then
            return {
                name = contact.name,
                number = otherPhoneNumber,
                avatar = contact.avatar,
            }
        end
    end

    return {
        name = '',
        number = otherPhoneNumber,
    }
end

---Registers a call in all lookup tables
---@param call table
local function indexCall(call)
    callsBySource[call.transmitterSource] = call
    callsBySource[call.receiverSource] = call
    busyNumbers[call.transmitter] = true
    busyNumbers[call.receiver] = true
end

---Removes a call from all lookup tables
---@param call table
local function unindexCall(call)
    callsBySource[call.transmitterSource] = nil
    callsBySource[call.receiverSource] = nil
    busyNumbers[call.transmitter] = nil
    busyNumbers[call.receiver] = nil
end

---Ends a call, cleans up voice channels, and notifies both parties
---@param call table
---@param reason string
local function endCall(call, reason)
    if not call then return end

    unindexCall(call)

    if call.isAccepted then
        exports['pma-voice']:setPlayerCall(call.transmitterSource, 0)
        exports['pma-voice']:setPlayerCall(call.receiverSource, 0)
    end

    TriggerClientEvent('phone:client:callMessage', call.transmitterSource, {
        action = 'ended',
        callId = call.channelId,
        reason = reason,
    })

    TriggerClientEvent('phone:client:callMessage', call.receiverSource, {
        action = 'ended',
        callId = call.channelId,
        reason = reason,
    })
end

---Ends a call for a specific player by server ID
---@param serverId integer
---@param reason string
function ClearPlayerCall(serverId, reason)
    endCall(callsBySource[serverId], reason)
end

---Initiates an outbound call from a player to a phone number
---@param serverId integer
---@param request { transmitterNumber: string, receiverNumber: string }
---@return table
local function attemptCall(serverId, request)
    if not request then return end

    local transmitterNumber = request.transmitterNumber and tostring(request.transmitterNumber):match('^%s*(.-)%s*$') or nil
    local receiverNumber = request.receiverNumber and tostring(request.receiverNumber):match('^%s*(.-)%s*$') or nil

    if not transmitterNumber or not transmitterNumber:match('^%d%d%d%d%d%d%d%d$') or not receiverNumber or not receiverNumber:match('^%d%d%d%d%d%d%d%d$') then
        return {
            ok = false,
            reason = 'unavailable',
        }
    end

    if not hasPhoneWithNumber(serverId, transmitterNumber) then
        return {
            ok = false,
            reason = 'unavailable',
        }
    end

    if transmitterNumber == receiverNumber then
        return {
            ok = false,
            reason = 'self',
        }
    end

    if busyNumbers[transmitterNumber] or busyNumbers[receiverNumber] then
        return {
            ok = false,
            reason = 'busy',
        }
    end

    local receiverSource = PhoneNumbers[receiverNumber]

    if not receiverSource then
        return {
            ok = false,
            reason = 'unavailable',
        }
    end

    local call = {
        transmitter = transmitterNumber,
        transmitterSource = serverId,
        receiver = receiverNumber,
        receiverSource = receiverSource,
        channelId = serverId,
        isAccepted = false,
    }

    indexCall(call)

    SetTimeout(CALL_TIMEOUT_MS, function()
        local activeCall = callsBySource[serverId]
        if activeCall == call and not activeCall.isAccepted then
            endCall(activeCall, 'timeout')
        end
    end)

    TriggerClientEvent('phone:client:callMessage', receiverSource, {
        action = 'incoming',
        callId = call.channelId,
        participant = resolveCallParticipant(receiverNumber, transmitterNumber),
    })

    return {
        ok = true,
        callId = call.channelId,
        status = 'ringing',
    }
end

lib.callback.register('phone:server:attemptCall', attemptCall)

lib.callback.register('phone:server:acceptCall', function(serverId, callId)
    local call = callsBySource[serverId]
    if not call or call.receiverSource ~= serverId or call.channelId ~= callId or call.isAccepted then
        return false
    end

    call.isAccepted = true

    exports['pma-voice']:setPlayerCall(call.transmitterSource, call.channelId)
    exports['pma-voice']:setPlayerCall(call.receiverSource, call.channelId)

    TriggerClientEvent('phone:client:callMessage', call.transmitterSource, {
        action = 'accepted',
        callId = call.channelId,
    })

    TriggerClientEvent('phone:client:callMessage', call.receiverSource, {
        action = 'accepted',
        callId = call.channelId,
    })

    return true
end)

lib.callback.register('phone:server:declineCall', function(serverId, callId)
    local call = callsBySource[serverId]
    if not call or call.receiverSource ~= serverId or call.channelId ~= callId or call.isAccepted then
        return false
    end

    endCall(call, 'declined')

    return true
end)

lib.callback.register('phone:server:endCall', function(serverId, callId)
    local call = callsBySource[serverId]
    if not call or call.channelId ~= callId then
        return false
    end

    endCall(call, 'ended')

    return true
end)

AddEventHandler('onResourceStop', function(resourceName)
    if cache.resource ~= resourceName then return end

    local cleaned = {}
    for _, call in pairs(callsBySource) do
        if not cleaned[call] then
            cleaned[call] = true
            if call.isAccepted then
                exports['pma-voice']:setPlayerCall(call.transmitterSource, 0)
                exports['pma-voice']:setPlayerCall(call.receiverSource, 0)
            end
        end
    end

    callsBySource = {}
    busyNumbers = {}
end)
