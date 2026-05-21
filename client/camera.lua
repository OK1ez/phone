-- TODO: keybinds?

local cameraActive = false
local cameraFrontFacing = false
local selfieLoopActive = false

---Keeps the player ped facing the selfie camera direction while selfie mode is active.
local function selfieHeadingLoop()
    while cameraActive and cameraFrontFacing do
        local cameraRotation = GetFinalRenderedCamRot(2)
        SetEntityHeading(cache.ped, (cameraRotation.z + 180.0) % 360.0)

        Wait(0)
    end

    selfieLoopActive = false
end

---Starts the selfie heading loop if it is not already running.
local function startSelfieLoop()
    if selfieLoopActive then return end

    selfieLoopActive = true
    CreateThread(selfieHeadingLoop)
end

---Stops the phone camera and resets camera state.
local function stopCamera()
    if not cameraActive then return end

    TriggerEvent('hud:hideHud', 'phone', false)

    cameraActive = false
    cameraFrontFacing = false

    CellCamActivateSelfieMode(false)
    CellCamActivate(false, false)

    DestroyMobilePhone()
end

---Starts the native phone camera if it is not already active.
---Always starts in rear-camera mode.
local function startCamera()
    if cameraActive then
        return
    end

    TriggerEvent('hud:hideHud', 'phone', true)

    cameraActive = true
    cameraFrontFacing = false

    DestroyMobilePhone()
    Wait(10)
    CreateMobilePhone(0)
    CellCamActivateSelfieMode(false)
    CellCamActivate(true, true)
    CellCamSetHorizontalOffset(0)
    CellCamSetVerticalOffset(1.0)
    CellCamSetDistance(1.0)
    CellCamSetHeadHeight(1.0)
end


---Ensures the camera is active, then toggles between rear and selfie mode.
---@return boolean frontFacing Whether the camera is front-facing after toggle.
local function toggleCameraDirection()
    if not cameraActive then
        startCamera()
    end

    cameraFrontFacing = not cameraFrontFacing
    CellCamActivateSelfieMode(cameraFrontFacing)

    if cameraFrontFacing then
        startSelfieLoop()
    end

    return cameraFrontFacing
end

---Opens the camera in rear-camera mode.
---@param _data nil
---@param cb fun(success: boolean)
RegisterNUICallback('openCamera', function(_data, cb)
    startCamera()
    cb(true)
end)

---Switches the current camera direction and returns the new direction.
---@param _data nil
---@param cb fun(direction: 'front' | 'rear')
RegisterNUICallback('toggleCameraDirection', function(_data, cb)
    local isFrontFacing = toggleCameraDirection()
    cb(isFrontFacing and 'front' or 'rear')
end)

---Closes the camera app and disables the phone camera.
---@param _data nil
---@param cb fun(success: boolean)
RegisterNUICallback('closeCamera', function(_data, cb)
    stopCamera()
    cb(true)
end)

---Stops the phone camera if this resource is stopped.
AddEventHandler('onResourceStop', function(resourceName)
    if cache.resource ~= resourceName then return end

    stopCamera()
end)
