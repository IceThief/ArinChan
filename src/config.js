const dotenv = require("dotenv").config()
const db = require('better-sqlite3')('./user.db');

process_token = process.env.token
process_dev_channel = process.env.dev_channel
process_twitch_channel = process.env.twitch_channel
process_main_channel = process.env.main_channel
process_kitchen_channel = process.env.kitchen_channel
process_roles_channel = process.env.roles_channel
process_rules_channel = process.env.rules_channel

if (process.env.dev == "1") {
    process_token = process.env.dev_token
    process_dev_channel = process.env.dev_dev_channel
    process_twitch_channel = process.env.dev_twitch_channel
    process_kitchen_channel = process.env.dev_kitchen_channel
    process_main_channel = process.env.dev_main_channel
    process_roles_channel = process.env.dev_roles_channel
    process_rules_channel = process.env.dev_rules_channel
}

module.exports = {
    db: db,

    token: process_token,

    dev_channel: process_dev_channel,
    twitch_channel: process_twitch_channel,
    main_channel: process_main_channel,
    rules_channel: process_rules_channel,
    roles_channel: process_roles_channel,
    kitchen_channel: process_kitchen_channel,

    prefix_chan: process.env.prefix_chan,
    prefix_command: process.env.prefix_command,
    prefix_admin: process.env.prefix_admin,

    ice_id: process.env.ice_id,
    arin_id: process.env.arin_id,
    kacper_id: process.env.kacper_id,
    kamila_id: process.env.kamila_id,

    twitch_url: process.env.twitch_url,
    twitch_auth: process.env.twitch_auth,
    twitch_client_id: process.env.twitch_client_id,
}