const config = require("./config.js")
const help = require("./help.js")
const emoji = require("./emoji.js")
const prefix = config.prefix_command

const ID = [config.arin_id, config.kacper_id, config.ice_id]
// const ID = [ config.ice_id]

const getRandomInt = (max) => { return Math.floor(Math.random() * Math.floor(max + 1)) }

function start(msg, client) {
    args_tb = msg.content.toLowerCase().slice(prefix.length).trim().split(" ")
    cmd = args_tb.shift().toString().replace(/!/g, '').replace('?', '').replace('.', '')
    args = args_tb.toString()
    args = args.replace(/,/g, ' ').replace(/  /g, ', ')
    switch (cmd) {
        case 'ping':
            msg.reply(`Opóźnienie wynosi ${Math.abs(Date.now() - msg.createdTimestamp)}ms. Opóźnienie API wynosi ${Math.round(client.ws.ping)}ms`)
            break
        case 'help':
            // msg.reply("To okno pomocy... Po prostu... WIP")
            help.show_help(msg)
            // msg.reply("```" + "To okno pomocy...\nem...no to...\n\n\na!ping - pokazuje ping między tobą a mną :>\na!help - to okno...\n\n\nArin gotuj - gotuje jedzonko\nArin pat pat - ...patanie\nArin oceń - oceniam dowolną rzecz / osobę :>\nArin amogus - amogus <: arinsus: 950120893793849384 >\nArin furry - czy jestem furry?...\nArin kiedy ... - jedno z pytanek : 3\nArin bonk ... - BONK!\nArin przytul - TUUULIII!\nArin coin - rzut monętą UwU\nem...\nJeśli znajdziesz jakiś błąd napisz go komendą a!error opisz błąd\nPropozycje piszcie a!prop propozycja\nDziękuje za odzew :> " + "```")
            break
        case 'error':
        case 'erro':
        case 'błąd':
            for (i = 0; i < ID.length; i++)
                client.users.fetch(ID[i]).then((user) => { user.send(`❌ ${msg.author.tag} zgłasza: ${args}`) })
            msg.reply("Zajmę się tym. Dzięki!")
            break
        case 'prop':
        case 'propozycja':
            for (i = 0; i < ID.length; i++)
                client.users.fetch(ID[i]).then((user) => { user.send(`✅ ${msg.author.tag} proponuje: ${args}`) })
            msg.reply("Propozycja wysłana. Dziękuję :>")
            break
        case "moneta":
            result = getRandomInt(1)
            switch (result) {
                case 1:
                    msg.reply("Wypadła reszka!")
                    break
                case 0:
                    msg.reply("Wypadł orzeł!")
                    break
            }
            break

        default:
            msg.reply(`Potrzebujesz pomocy?\nUżyj ${prefix}help do uzyskania pomocy!`)
            break
    }
}


exports.start = start