RegisterCommand('givePhone', function(source, args, rawCommand)
    local metadata = {
        deviceId = tostring(math.random(1000000, 9999999))
    }
    exports.ox_inventory:AddItem(source, 'phone', 1, metadata)
end)
