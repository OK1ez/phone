---Fetches contacts for the active cloud account.
---@param cloudId number
---@param cb fun(result: table)
RegisterNUICallback('fetchContacts', function(cloudId, cb)
    local contacts = lib.callback.await('phone:server:fetchContacts', false, cloudId)
    cb(contacts)
end)

---Adds a contact to the active cloud account.
---@param data { cloudId: number, name: string, phoneNumber: string }
---@param cb fun(result: table)
RegisterNUICallback('createContact', function(data, cb)
    local contact = lib.callback.await('phone:server:createContact', false, data.cloudId, data.name, data.phoneNumber)
    cb(contact)
end)

---Toggles whether a contact is favorited.
---@param data { cloudId: number, contactId: number, favorited: boolean }
---@param cb fun(result: table|false)
RegisterNUICallback('toggleFavorite', function(data, cb)
    if not data.cloudId or not data.contactId or data.favorited == nil then
        cb(false)
        return
    end

    local result = lib.callback.await('phone:server:toggleFavorite', false, data.cloudId, data.contactId, data.favorited)
    cb(result)
end)

---@param request { transmitterNumber: string, receiverNumber: string }
---@param cb fun(result: table)
RegisterNUICallback('attemptCall', function(request, cb)
    local result = lib.callback.await('phone:server:attemptCall', false, request)
    cb(result)
end)

---@param callId number
---@param cb fun(result: boolean)
RegisterNUICallback('acceptCall', function(callId, cb)
    local result = lib.callback.await('phone:server:acceptCall', false, callId)
    cb(result)
end)

---@param callId number
---@param cb fun(result: boolean)
RegisterNUICallback('declineCall', function(callId, cb)
    local result = lib.callback.await('phone:server:declineCall', false, callId)
    cb(result)
end)

---@param callId number
---@param cb fun(result: boolean)
RegisterNUICallback('endCall', function(callId, cb)
    local result = lib.callback.await('phone:server:endCall', false, callId)
    cb(result)
end)

RegisterNetEvent('phone:client:callMessage', function(data)
    print('phone:client:callMessage', json.encode(data, { indent = true }))
    SendNUIMessage({
        action = 'callMessage',
        data = data
    })
end)
