---@class NotificationData
---@field app string
---@field title string
---@field content string

---@param data NotificationData
local function sendNotification(data)
    if not data then return end

    SendNUIMessage({
        action = 'showNotification',
        data = data
    })

    exports.nativeaudio:playSoundFrontend({
        audio = {
            name = 'Notification',
            ref = 'Phone_SoundSet_Michael'
        }
    })
end
exports('sendNotification', sendNotification)

RegisterNetEvent('phone:sendNotification', sendNotification)


RegisterCommand('noti', function()
    sendNotification({
        app = 'phone',
        title = 'Notification',
        content = 'This is a notification message.'
    })
end)
