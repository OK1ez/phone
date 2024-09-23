-- FX Information
fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

-- Resource Information
name 'phone'
author 'OKiez'
version '1.0.0'
description 'A phone'

-- Manifest
shared_script '@ox_lib/init.lua'

client_scripts {
    'client/main.lua'
}

server_scripts {
    'server/main.lua'
}

files {
    'locales/*.json',
    'config/*.lua'
}
