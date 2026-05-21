---Requests a presigned upload URL for captured media.
---@param _data nil
---@param cb fun(presignedUrl: string?)
RegisterNUICallback('requestMediaUploadUrl', function(_data, cb)
    local presignedUrl = lib.callback.await('phone:server:requestMediaUploadUrl', false)

    exports.nativeaudio:playSoundFrontend({ -- TODO: only play for photos, not videos.
        audio = {
            name = 'Camera_Shoot',
            ref = 'Phone_SoundSet_Michael'
        }
    })

    cb(presignedUrl)
end)

---Creates uploaded media on the active cloud account.
---@param data { cloudId: number, url: string, type: 'image' | 'video' }
---@param cb fun(result: table|false)
RegisterNUICallback('createMedia', function(data, cb)
    local media = lib.callback.await('phone:server:createMedia', false, data.cloudId, data.url, data.type)
    cb(media)
end)

---Fetches media for the active cloud account.
---@param cloudId number
---@param cb fun(result: table[])
RegisterNUICallback('fetchMedia', function(cloudId, cb)
    local media = lib.callback.await('phone:server:fetchMedia', false, cloudId)
    cb(media)
end)
