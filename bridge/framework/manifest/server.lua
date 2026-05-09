
-- Bridge Functions --

---Gets the character id of the specified player
---@param serverId integer
---@return integer
function GetPlayerCharacterId(serverId)
    return exports.core:getPlayerCharacterId(serverId)
end
