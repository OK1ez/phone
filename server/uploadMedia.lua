local API_BASE <const> = 'https://api.fivemanage.com/api/v3'
local UPLOAD_URL_TTL <const> = 10 * 60
local API_KEY = GetConvar('FIVEMANAGE_MEDIA_API_KEY', '')

---Requests a presigned upload URL from Fivemanage.
---@return string? presignedUrl
local function requestUploadURL()
    if API_KEY == '' then
        print('API key is not configured')
        return nil
    end

    local expiresAt = os.time() + UPLOAD_URL_TTL
    local url = ('%s/file/presigned-url?expiresAt=%d'):format(API_BASE, expiresAt)
    local promise = promise.new()

    PerformHttpRequest(url, function(statusCode, body)
        if statusCode ~= 200 then
            promise:resolve(nil)
            return
        end

        local ok, parsed = pcall(json.decode, body or '')
        local presignedUrl = ok and parsed and parsed.data and parsed.data.presignedUrl

        if not presignedUrl then
            promise:resolve(nil)
            return
        end

        promise:resolve(presignedUrl)
    end, 'GET', '', {
        ['Authorization'] = API_KEY
    })

    return Citizen.Await(promise)
end

---Returns a presigned upload URL to the client.
---@param _serverId integer
---@return string? presignedUrl
lib.callback.register('phone:server:getUploadURL', function(_serverId)
    return requestUploadURL()
end)

---Saves uploaded media for a cloud account.
---@param _serverId integer
---@param cloudId number
---@param url string
---@param mediaType 'image' | 'video'
---@return table|false
lib.callback.register('phone:server:saveMedia', function(_serverId, cloudId, url, mediaType)
    if not cloudId or not url or (mediaType ~= 'image' and mediaType ~= 'video') then
        return false
    end

    local mediaId = MySQL.insert.await('INSERT INTO `phone_gallery` (cloudId, url, type) VALUES (?, ?, ?)', {
        cloudId,
        url,
        mediaType
    })

    return {
        id = mediaId,
        url = url,
        type = mediaType,
    }
end)

-- TODO: only fetch again when phone/cloud is changed

---Fetches gallery media for a cloud account.
---@param _serverId integer
---@param cloudId number
---@return table[]
lib.callback.register('phone:server:fetchGallery', function(_serverId, cloudId)
    return MySQL.query.await('SELECT `id`, `url`, `type`, `timestamp` FROM `phone_gallery` WHERE `cloudId` = ? ORDER BY `timestamp` DESC', {
        cloudId
    })
end)
