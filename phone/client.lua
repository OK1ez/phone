local isOpen = false

-- Functions

local function toggleOpen()

end
exports("toggleOpen", toggleOpen)

-- Returns true if the phone is open
---@return boolean
local function isPhoneOpen()
    return isOpen
end
exports("isPhoneOpen", isPhoneOpen)

local function openPhone(_item, slot)
    if not slot.metadata or not slot.metadata.deviceId then
        error("Missing deviceId")
        return
    end

    local deviceId = slot.metadata.deviceId
    print('open phone', deviceId)

    SendNUIMessage({
        action = 'phone:visible',
        data = {
            visible = true,
            deviceId = deviceId
        }
    })

    SetNuiFocus(true, true)

    isOpen = true
end
exports('openPhone', openPhone)


-- NUICallbacks

RegisterNUICallback('phone:close', function()
    SendNUIMessage({
        action = 'phone:visible',
        data = {
            visible = false
        }
    })

    SetNuiFocus(false, false)

    isOpen = false
end)


-- Events
