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
    'phone/client.lua'
}

server_scripts {
    'phone/server.lua'
}

files {
    'locales/*.json',
    'config/*.lua',
    'web/build/index.html',
    'web/build/*.js',
    'web/build/*.css',
}

-- ui_page 'web/build/index.html'
ui_page 'http://localhost:5173/'
