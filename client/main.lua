local config <const> = require 'config.main'

local phoneOpen = false

-- Functions

---Gets metadata for the first phone item in the player's inventory.
local function getPhoneToOpen()
    local slot = exports.ox_inventory:GetSlotWithItem('phone')
    if not slot then
        return nil
    end

    return slot.metadata
end

---Opens the phone UI for the supplied item metadata.
local function openPhone(metadata)
    if not metadata or not metadata.phoneId then return end

    phoneOpen = true

    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'openPhone',
        data = {
            phoneId = metadata.phoneId,
            cloudId = metadata.cloudId
        }
    })
end

---Opens the phone from an ox_inventory item export.
---@param _item table
---@param slot table
local function openPhoneInvExport(_item, slot)
    if not slot.metadata or not slot.metadata.phoneId then
        print('No phoneId found in item metadata')
        return
    end

    openPhone(slot.metadata)
end
exports('openPhone', openPhoneInvExport)

-- NUI Callbacks

---Closes the phone and releases NUI focus.
---@param _data nil
---@param cb fun(result: boolean)
RegisterNUICallback('closePhone', function(_data, cb)
    phoneOpen = false
    SetNuiFocus(false, false)
    cb(true)
end)

---Releases NUI focus while keeping the phone session open.
---@param _data nil
---@param cb fun(success: boolean)
RegisterNUICallback('closeNuiFocus', function(_data, cb)
    SetNuiFocus(false, false)
    cb(true)
end)

---Fetches the shell state for a cloud account.
---@param cloudId number
---@param cb fun(result: table|false)
RegisterNUICallback('getShell', function(cloudId, cb)
    local shell = lib.callback.await('phone:server:getShell', false, cloudId)
    cb(shell)
end)

---Unlocks a cloud account with a PIN.
---@param data { cloudId: number, pin: string }
---@param cb fun(result: table|false)
RegisterNUICallback('unlockPhone', function(data, cb)
    local phoneData = lib.callback.await('phone:server:unlockPhone', false, data.cloudId, data.pin)
    cb(phoneData)
end)

---Fetches clouds owned by the current character.
---@param _data nil
---@param cb fun(result: table[]|false)
RegisterNUICallback('fetchOwnedClouds', function(_data, cb)
    local clouds = lib.callback.await('phone:server:fetchOwnedClouds', false)
    cb(clouds)
end)

---Creates a new cloud account and links it to a phone item.
---@param data { phoneId: number, name: string, pin: string }
---@param cb fun(result: table|false)
RegisterNUICallback('createCloud', function(data, cb)
    local phoneData = lib.callback.await('phone:server:createCloud', false, data.phoneId, data.name, data.pin)
    cb(phoneData)
end)

---Links an existing cloud account to a phone item.
---@param data { phoneId: number, cloudId: number }
---@param cb fun(result: table|false)
RegisterNUICallback('attachCloud', function(data, cb)
    local phoneData = lib.callback.await('phone:server:attachCloud', false, data.phoneId, data.cloudId)
    cb(phoneData)
end)

---Saves settings for a cloud account.
---@param data { cloudId: number, settings: table }
---@param cb fun(result: table|false)
RegisterNUICallback('updateSettings', function(data, cb)
    local settings = lib.callback.await('phone:server:updateSettings', false, data.cloudId, data.settings)
    cb(settings)
end)

-- Commands and keybinds

RegisterKeyMapping('openPhone', locale('keymapping_open_phone'), config.keymapping.phone.mapper, config.keymapping.phone.key)
RegisterCommand('openPhone', function()
    if IsPauseMenuActive() then return end

    local metadata = getPhoneToOpen()
    if not metadata or not metadata.phoneId then
        print('No phone found in inventory')
        return
    end

    openPhone(metadata)
end)

RegisterKeyMapping('toggleNuiFocus', 'Toggle cursor focus', 'keyboard', 'LMENU')
RegisterCommand('toggleNuiFocus', function()
    if phoneOpen then
        SetNuiFocus(true, true)
    end
end)

















---@param phoneNumber number
---@param cb fun(result: table|false)
RegisterNuiCallback('attemptCall', function(phoneNumber, cb)
    local result = lib.callback.await('phone:server:attemptCall', false, phoneNumber)


    cb(result)
end)

RegisterNuiCallback('answerCall', function(data, cb)

end)

RegisterNuiCallback('rejectCall', function(data, cb)

end)

RegisterNuiCallback('endCall', function(data, cb)

end)
