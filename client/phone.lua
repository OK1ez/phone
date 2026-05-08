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
RegisterNUICallback('addContact', function(data, cb)
    local contact = lib.callback.await('phone:server:addContact', false, data.cloudId, data.name, data.phoneNumber)
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
