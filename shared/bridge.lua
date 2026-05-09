local config <const> = require 'config.bridge'
local ENVIRONMENT <const> = IsDuplicityVersion() and 'server' or 'client'

local framework = config.framework

require(string.format('bridge/framework/%s/shared', framework))
require(string.format('bridge/framework/%s/%s', framework, ENVIRONMENT))
