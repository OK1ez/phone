-- FX Information
fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

-- Resource Information
name 'phone'
author 'OKiez'
version '1.0.0'
description 'A modern phone for FiveM, built with Svelte.'

-- Manifest
client_scripts {
    'client/main.lua',
    'client/phone.lua',
    'client/notifications.lua',
    'client/camera.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
    'server/phone.lua',
    'server/uploadMedia.lua'
}

shared_scripts {
    '@ox_lib/init.lua',
    'shared/bridge.lua',
}

files {
    'locales/*.json',
    'data/*.lua',

    'config/*.lua',
    'bridge/**/client.lua',
    'bridge/**/shared.lua',

    'web/build/index.html',
    'web/build/index.js',
    'web/build/index.css',
    'web/build/*.webp'
}

-- ui_page 'web/build/index.html'
ui_page 'http://localhost:5173/'

ox_lib 'locale'
