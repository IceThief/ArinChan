const { Client, GatewayIntentBits, ActivityType } = require('discord.js')
const cron = require('node-cron')
const request = require('request')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] })
const config = require("./config.js")

const embed_builder = require("./embed_builder.js")

const chan_module = require("./chan.js")
const admin_module = require("./admin.js")
const cmd_module = require("./cmd.js")
const cook_module = require("./cook.js")
const emoji = require("./emoji.js")

const headers_tb = {
    'Authorization': config.twitch_auth,
    'Client-Id': config.twitch_client_id
}

const options = {
    url: config.twitch_url,
    headers: headers_tb
}

var morning_mess = `Dzień dobry pomidorki ${emoji.hemlo}\nJak się spało? ${emoji.uwu}`
var twitch_mess = `Zapraszam was na strimka! ${emoji.hemlo}${emoji.hemlo}${emoji.hemlo} @everyone`

const ID = [config.arin_id, config.kacper_id, config.ice_id]

var live = false
var embedMessage = null

var users = []

const log = (v) => { client.channels.cache.get(config.dev_channel).send("```" + v + "```") }

function cron_init() {
    cron.schedule('0 8 * * *', () => { console.log("Poranek"); client.channels.cache.get(config.main_channel).send(morning_mess) })
    cron.schedule('0 5 * * *  ', () => { log('Doba zresetowana!'); console.log("Północ"); config.db.prepare('UPDATE users SET Dzien=?').run('false') })
    cron.schedule('* * * * *', () => {
        request.get(options, (err, res, body) => {
            if (err) return log(err)
            try {
                let json = JSON.parse(body)
                if (json.data[0] == null) {
                    live = false
                    client.user.setPresence({ activities: [{ name: `Genshin Impact`, type: ActivityType.Playing }] })
                    if (embedMessage != null) {
                        embedMessage.delete()
                        embedMessage = null
                    }
                    return console.log("live off")
                }
                if (live == false) {
                    live = true
                    client.user.setPresence({ activities: [{ name: `Mamę`, type: ActivityType.Watching }] })
                    twitch_embed = embed_builder.twitch_embed(json.data[0].title, json.data[0].thumbnail_url)
                    client.channels.cache.get(config.twitch_channel).send({ content: twitch_mess, embeds: [twitch_embed] }).then((mess) => { embedMessage = mess })
                }
                return console.log("live on...")
            } catch (error) {
                return log(error)
            }

        })
    })
}

client.on('ready', () => {

    console.log(`Zalogowano jako ${client.user.tag}!`)
    console.log(config.dev_channel)
    log("Arin Uruchomiona!")
    cron_init()
})

client.on('error', (err) => {
    console.error(err)
})

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return
    if (msg.channel.id == "1034073066743025696") return
    var user = config.db.prepare(`SELECT * FROM users WHERE id = ? `).get(msg.author.id)

    // config.db.get(`SELECT * FROM test WHERE id='1'`, function (err, test) { console.log(test) })
    if (user == undefined) {
        console.log(`Brak użytkownika ${msg.author.tag}!`)
        config.db.prepare(`INSERT INTO users VALUES (?, ?, ?, ?)`).run(msg.author.id, 'false', "none", "false")
        user = config.db.prepare(`SELECT * FROM users WHERE id = ? `).get(msg.author.id)
    }
    console.log(user)
    // console.log(users.Database)
    // console.log(users.findIndex((a) => a.id == msg.author.id))
    // if(users.findIndex((a) => a.id == msg.author.id)) console.log("ZNALEZIONO USERA!")
    // if(users.findIndex((a) => a.id == msg.author.id)) console.log("ZNALEZIONO USERA!")
    if (((msg.content.toLowerCase().includes('hej') || msg.content.toLowerCase().includes('wita')) && msg.content.toLowerCase().includes("arin")) && user.Dzien == 'true') return msg.reply(`Hejka! <@!${msg.author.id}> ${emoji.hemlo}`)

    if (user.Dzien == 'false' && msg.channel.id == config.main_channel) {
        // msg.reply(`Dzień dobry pomidorku!\nJak tam dzionek?`)
        config.db.prepare('UPDATE users SET Dzien=? WHERE ID=?').run('true', msg.author.id)
        console.log(`${msg.author.tag} ${msg.author.id} Wysłał pierwsza wiadomośc dnia!`)
    }

    if ((msg.content.toLowerCase().startsWith(config.prefix_chan) || msg.content.toLowerCase().startsWith(config.prefix_command)) && (!msg.content.toLowerCase().includes("przepraszam") && !msg.content.toLowerCase().includes("pseplasiam")) && user.Foch == "true") {
        return msg.reply('Fochnęłam się na ciebie PFF!')
    }
    if (msg.content.toLowerCase().includes('dobranoc')) return msg.reply(`Dobranocka <@!${msg.author.id}> ${emoji.kocyk}`)

    if (msg.content.toLowerCase() == 'arin pomidor to warzywo czy owoc?') {
        msg.channel.send("Serio?")
        setTimeout(function () { msg.channel.send("nie") }, 1000)
        setTimeout(function () { msg.channel.send("NIE") }, 2000)
        setTimeout(function () { msg.channel.send("NIE!!!!") }, 3000)
        // setTimeout(function () { msg.channel.send("NIE") }, 500)
        // setTimeout(function () { msg.channel.send("NIE") }, 500)
        setTimeout(function () { msg.channel.send("WYJDŹ!!!") }, 5000)
        setTimeout(function () { msg.channel.send("POWIEDZIAŁAM WYJDŹ!") }, 6000)
        return
    }

    if (msg.content.toLowerCase().startsWith(config.prefix_chan)) chan_module.start(msg, client)
    if (msg.content.toLowerCase().startsWith(config.prefix_command)) cmd_module.start(msg, client)
    if (ID.indexOf(msg.author.id) != -1)
        if (msg.content.toLowerCase().startsWith(config.prefix_admin)) admin_module.start(msg, client)
    if (msg.author.id == '447488933530566658' && msg.content.toLowerCase() == "b!test") {
        msg.reply("Witaj Black!")
    }
})

client.login(config.token);
exports.log = log