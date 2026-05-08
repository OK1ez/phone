
-- todo?: use same system as we use for bank transactions to fetch and search?
-- todo!: we update contacts in ui when we add someone, so dont need to fetch all the time, only fetch new when its a new cloudId
-- todo!: fix search, make list alphabetical

---Fetches contacts saved on a cloud account.
---@param _serverId integer
---@param cloudId number
---@return table[]
lib.callback.register('phone:server:fetchContacts', function(_serverId, cloudId)
    local contacts = MySQL.query.await('SELECT `id`, `name`, `phoneNumber`, `avatar`, `favorited` FROM `phone_contacts` WHERE `cloudId` = ? ORDER BY `name`, `phoneNumber`', {
        cloudId
    })

    return contacts
end)

---Adds a contact to a cloud account.
---@param _serverId integer
---@param cloudId number
---@param name string
---@param phoneNumber string
---@return table|false
lib.callback.register('phone:server:addContact', function(_serverId, cloudId, name, phoneNumber)
    local trimmedName = name:match('^%s*(.-)%s*$')
    local trimmedPhoneNumber = phoneNumber:match('^%s*(.-)%s*$')

    if #trimmedName > 35 or #trimmedPhoneNumber > 8 then
        return false
    end

    local id = MySQL.insert.await('INSERT INTO `phone_contacts` (cloudId, name, phoneNumber) VALUES (?, ?, ?)', { cloudId, trimmedName, trimmedPhoneNumber })

    return {
        id = id,
        name = trimmedName,
        phoneNumber = trimmedPhoneNumber,
        avatar = nil,
        favorited = false,
    }
end)

---Toggles whether a contact is favorited.
---@param _serverId integer
---@param cloudId number
---@param contactId number
---@param favorited boolean
---@return table|false
lib.callback.register('phone:server:toggleFavorite', function(_serverId, cloudId, contactId, favorited)
    local affectedRows = MySQL.update.await('UPDATE `phone_contacts` SET `favorited` = ? WHERE `cloudId` = ? AND `id` = ? LIMIT 1', {
        favorited and 1 or 0, cloudId, contactId
    })

    if affectedRows == 0 then
        return false
    end

    return {
        id = contactId,
        favorited = favorited,
    }
end)
