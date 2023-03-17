const { messageLink } = require('discord.js')
const config = require('./config.js')
const prefix = config.prefix_admin
const main = require('./main.js')

function start(msg, client) {
    args_tb_c = msg.content.slice(prefix.length).trim().split(' ')
    args_tb_c.shift()
    args_c = args_tb_c.toString()
    args_c = args_c.replace(/,/g, ' ').replace(/  /g, ', ')

    args_tb = msg.content.toLowerCase().slice(prefix.length).trim().split(' ')
    args = args_tb.toString()
    cmd = args_tb.shift().toString().replace(/!/g, '').replace('?', '').replace('.', '')
    args = args.replace(/,/g, ' ').replace(/  /g, ', ')
    // if(1 == 1) return console.error('UNAUTHORIZE ACCESS BY ' + msg.author.tag + ' TIMESTAMP: ' + msg.createdTimestamp)
    switch (cmd) {
        case 'send':
            if (args_c == "" || args_c == " ") return msg.reply("SEND co?")
            main.log(`${msg.author.tag} użył komendy SEND z argumentami:\n${args_c}`)
            client.channels.cache.get(config.main_channel).send(args_c)
            break
        case 'bajka':
            main.log(`${msg.author.tag} użył komendy BAJKA`)
            client.channels.cache.get(config.main_channel).send('Czas na bajkę~ <@&1023702542007414814>')
            break
        case 'pass':

            break
        case 'reset':
            main.log(`Doba zresetowana! przez ${msg.author.tag}!`);
            console.log("Północ");
            config.db.prepare('UPDATE users SET Dzien=?').run('false')

            break
        case 'dm':
            if (msg.mentions.users.first()) {
                msg.reply("Wiadomość DM wysłana!")
                return client.users.fetch(msg.mentions.users.first().id).then((user) => { user.send(`${args_c.replace(`<@${msg.mentions.users.first().id}>,`, '')}`) })
            }
            return client.users.fetch(msg.author.id).then((user) => { user.send(`ERROR`) })
        default:

            break
    }

}

exports.start = start