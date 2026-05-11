local phoneNumbers = {}

-- Functions

---Generates an unused phone cloud id.
---@return number
local function generateNewCloudId()
    local cloudId
    local result

    repeat
        cloudId = math.random(10000, 99999)
        result = MySQL.query.await('SELECT 1 FROM `phone_clouds` WHERE `cloudId` = ? LIMIT 1', { cloudId })
    until #result == 0

    return cloudId
end

---Generates an unused phone number.
---@return number
local function generateNewPhoneNumber()
    local phoneNumber
    local result

    repeat
        phoneNumber = math.random(10000000, 99999999)
        result = MySQL.query.await('SELECT 1 FROM `phone_clouds` WHERE `phoneNumber` = ? LIMIT 1', { phoneNumber })
    until #result == 0

    return phoneNumber
end

---Generates an unused phone device id.
---@return number
local function generateNewPhoneId()
    local phoneId
    local exists

    repeat
        phoneId = math.random(100000, 999999)
        exists = MySQL.query.await('SELECT 1 FROM `phone_devices` WHERE `phoneId` = ? LIMIT 1', { phoneId })
    until #exists == 0

    return phoneId
end

---Checks whether a player has a phone item with the given device id.
---@param serverId integer
---@param phoneId number
---@return boolean
local function doesPlayerHavePhone(serverId, phoneId)
    local items = exports.ox_inventory:GetInventoryItems(serverId)
    if not items then
        return false
    end

    for _slot, item in pairs(items) do
        local metadata = item.metadata or {}
        if item.name == 'phone' and metadata.phoneId == phoneId then
            return true
        end
    end

    return false
end

---Fetches full phone data for a cloud account.
---@param cloudId number
---@return table|false
local function getCloudData(cloudId)
    local cloud = MySQL.single.await('SELECT `cloudId`, `settings`, `name`, `phoneNumber`, `owner` FROM `phone_clouds` WHERE `cloudId` = ? LIMIT 1', {
        cloudId
    })

    if not cloud then
        return false
    end

    return {
        cloudId = cloud.cloudId,
        name = cloud.name,
        phoneNumber = cloud.phoneNumber,
        owner = cloud.owner,
        settings = cloud.settings and json.decode(cloud.settings) or nil,
    }
end

---Writes cloud metadata back to the matching phone item.
---@param serverId integer
---@param phoneId number
---@param cloudId number
local function syncPhoneItemMetadata(serverId, phoneId, cloudId)
    local phoneMetadata = MySQL.single.await('SELECT `phoneNumber`, `pin` FROM `phone_clouds` WHERE `cloudId` = ? LIMIT 1', {
        cloudId
    })

    if not phoneMetadata then
        return
    end

    local items = exports.ox_inventory:GetSlotsWithItem(serverId, 'phone')
    if not items then
        return
    end

    for _index, item in pairs(items) do
        local metadata = item.metadata or {}

        if item.name == 'phone' and metadata.phoneId == phoneId then
            metadata.cloudId = cloudId
            metadata.phoneNumber = phoneMetadata.phoneNumber
            metadata.pinCode = phoneMetadata.pin
            exports.ox_inventory:SetMetadata(serverId, item.slot, metadata)
            phoneNumbers[phoneMetadata.phoneNumber] = serverId
            return
        end
    end
end

---Clears cached phone number ownership for a player.
---@param serverId integer
local function clearPlayerPhoneNumbers(serverId)
    for phoneNumber, sourceId in pairs(phoneNumbers) do
        if sourceId == serverId then
            phoneNumbers[phoneNumber] = nil
        end
    end
end

---Syncs phone number ownership from a player's phone items.
---@param serverId integer
local function syncPlayerPhoneNumbers(serverId)
    Wait(0)

    clearPlayerPhoneNumbers(serverId)

    local items = exports.ox_inventory:GetSlotsWithItem(serverId, 'phone')
    if not items then return end

    for _index, item in pairs(items) do
        local metadata = item.metadata or {}

        if metadata.phoneId and not metadata.cloudId then
            local device = MySQL.single.await('SELECT `cloudId` FROM `phone_devices` WHERE `phoneId` = ? LIMIT 1', {
                metadata.phoneId
            })

            if device and device.cloudId then
                syncPhoneItemMetadata(serverId, metadata.phoneId, device.cloudId)
            end
        end

        if metadata.phoneNumber then
            phoneNumbers[metadata.phoneNumber] = serverId
        end
    end
end

-- Callbacks

---Gets the locked or unlocked shell state for a cloud account.
---@param serverId integer
---@param cloudId number
---@return table|false
lib.callback.register('phone:server:getShell', function(serverId, cloudId)
    if not cloudId then
        return false
    end

    local cloud = MySQL.single.await('SELECT `cloudId`, `owner` FROM `phone_clouds` WHERE `cloudId` = ? LIMIT 1', {
        cloudId
    })

    if not cloud then
        return false
    end

    local charId = GetPlayerCharacterId(serverId)

    if cloud.owner ~= charId then
        return {
            state = 'locked',
            cloudId = cloud.cloudId
        }
    end

    return {
        state = 'unlocked',
        data = getCloudData(cloud.cloudId)
    }
end)

---Fetches cloud accounts owned by the current character.
---@param serverId integer
---@return table[]
lib.callback.register('phone:server:fetchOwnedClouds', function(serverId)
    local charId = GetPlayerCharacterId(serverId)

    return MySQL.query.await('SELECT `cloudId`, `name`, `phoneNumber` FROM `phone_clouds` WHERE `owner` = ? ORDER BY `name`', {
        charId
    })
end)

---Unlocks a cloud account with its PIN.
---@param _serverId integer
---@param cloudId number
---@param pin string
---@return table|false
lib.callback.register('phone:server:unlockPhone', function(_serverId, cloudId, pin)
    local trimmedPin = pin:match('^%s*(.-)%s*$')
    if trimmedPin == '' then
        return false
    end

    local result = MySQL.single.await('SELECT `pin` FROM `phone_clouds` WHERE `cloudId` = ? LIMIT 1', {
        cloudId
    })

    if not result or result.pin ~= trimmedPin then
        return false
    end

    return getCloudData(cloudId)
end)

---Creates a cloud account and links it to a phone item.
---@param serverId integer
---@param phoneId number
---@param name string
---@param pin string
---@return table|false
lib.callback.register('phone:server:createCloud', function(serverId, phoneId, name, pin)
    if not phoneId or not doesPlayerHavePhone(serverId, phoneId) then
        return false
    end

    local trimmedName = name:match('^%s*(.-)%s*$')
    local trimmedPin = pin:match('^%s*(.-)%s*$')

    if trimmedName == '' or #trimmedName > 35 then
        return false
    end

    if trimmedPin == '' or #trimmedPin > 4 then
        return false
    end

    local charId = GetPlayerCharacterId(serverId)
    local cloudId = generateNewCloudId()

    MySQL.insert.await('INSERT INTO `phone_clouds` (`cloudId`, `name`, `phoneNumber`, `owner`, `pin`) VALUES (?, ?, ?, ?, ?)', {
        cloudId, trimmedName, generateNewPhoneNumber(), charId, trimmedPin
    })

    local affectedRows = MySQL.update.await('UPDATE `phone_devices` SET `cloudId` = ? WHERE `phoneId` = ?', {
        cloudId, phoneId
    })

    if affectedRows == 0 then
        return false
    end

    syncPhoneItemMetadata(serverId, phoneId, cloudId)

    return getCloudData(cloudId)
end)

---Links an owned cloud account to a phone item.
---@param serverId integer
---@param phoneId number
---@param cloudId number
---@return table|false
lib.callback.register('phone:server:attachCloud', function(serverId, phoneId, cloudId)
    if not phoneId or not cloudId or not doesPlayerHavePhone(serverId, phoneId) then
        return false
    end

    local charId = GetPlayerCharacterId(serverId)

    local cloud = MySQL.single.await('SELECT 1 FROM `phone_clouds` WHERE `cloudId` = ? AND `owner` = ? LIMIT 1', {
        cloudId, charId
    })

    if not cloud then
        return false
    end

    local affectedRows = MySQL.update.await('UPDATE `phone_devices` SET `cloudId` = ? WHERE `phoneId` = ?', {
        cloudId, phoneId
    })

    if affectedRows == 0 then
        return false
    end

    syncPhoneItemMetadata(serverId, phoneId, cloudId)

    return getCloudData(cloudId)
end)

---Saves settings for a cloud account.
---@param _serverId integer
---@param cloudId number
---@param settings table
---@return table|false
lib.callback.register('phone:server:updateSettings', function(_serverId, cloudId, settings)
    MySQL.update.await('UPDATE `phone_clouds` SET `settings` = ? WHERE `cloudId` = ? LIMIT 1', {
        json.encode(settings),
        cloudId
    })

    return settings
end)

-- Hooks

---Adds phone device metadata when a phone item is created.
local createItemHookId = exports.ox_inventory:registerHook('createItem', function(payload)
    local metadata = payload.metadata or {}
    if metadata.phoneId then
        return
    end

    local phoneId = generateNewPhoneId()
    metadata.phoneId = phoneId

    return metadata
end, {
    itemFilter = {
        phone = true
    }
})

local swapItemsHookId = exports.ox_inventory:registerHook('swapItems', function(_payload)
end, {
    itemFilter = {
        phone = true
    }
})

---Saves the phone device data once the inventory action succeeds
AddEventHandler(createItemHookId, function(success, payload)
    if not success then return end

    local metadata = payload.metadata or {}
    if not metadata.phoneId then
        return
    end

    MySQL.insert('INSERT INTO `phone_devices` (`phoneId`) VALUES (?)', { metadata.phoneId })
end)

---Updates cached phone number ownership after a phone item move succeeds.
AddEventHandler(swapItemsHookId, function(success, payload)
    if not success then return end

    local metadata = payload.fromSlot.metadata or {}
    local phoneNumber = metadata.phoneNumber

    if not phoneNumber then return end

    if payload.toType == 'player' then
        phoneNumbers[phoneNumber] = payload.toInventory
    elseif payload.fromType == 'player' then
        phoneNumbers[phoneNumber] = nil
    end
end)

---Syncs phone number ownership for online players when the resource starts.
AddEventHandler('onResourceStart', function(resourceName)
    if cache.resource ~= resourceName then return end

    Wait(1000)

    for _index, serverId in pairs(GetPlayers()) do
        syncPlayerPhoneNumbers(tonumber(serverId))
    end
end)

---Syncs phone number ownership when a character loads.
RegisterNetEvent('core:playerLoaded', function()
    syncPlayerPhoneNumbers(source)
end)

---Clears phone number ownership when a character drops.
RegisterNetEvent('core:playerDropped', function(serverId)
    clearPlayerPhoneNumbers(serverId)
end)



RegisterCommand('phoneNumbers', function(source, args)
    print(json.encode(phoneNumbers, { indent = true }))
end)


-- exports['pma-voice']:setPlayerCall(source, 1)


lib.callback.register('phone:server:attemptCall', function(serverId, phoneNumber)
    print(serverId, "attempting to call", phoneNumber)

    local receiver = phoneNumbers[phoneNumber]

    print("getting called", receiver)

end)
