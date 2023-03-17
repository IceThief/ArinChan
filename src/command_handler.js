const config = require("./config.js")
const { EmbedBuilder } = require('discord.js');
const request = require("request");
const prefix = config.prefix
const main = require("./main.js");
const dev_id = config.dev_id
const arin_id = config.arin_id
const kacper_id = config.kacper_id


uri = 'https://api.twitch.tv/helix/streams?user_login=arin_waifu';
headers_tb = {
    'Authorization': 'Bearer q7bo07ges8s5mguouulcd7vatby6uy',
    'Client-Id': 'nsrfw5ucoo2ufupnr9z47u0ddcnd36'
}
//zmienne gotowania
last_food = -1
last_awnser = -1


food_eng = ["cookie", "dumpling", "poultry_leg", "sushi", "hotdog", "fries", "ramen", "pizza", "rice", "taco", "cake", "bricks"] //12
food_pl = ["ciastko", "pierogi", "udko z kurczaka", "sushi", "hotdog", "frytki", "ramen", "pizza", "ryż", "tako", "ciasto", "cegła"]
food_many = [false, true, false, true, false, true, false, true, false, true, false, false]

gram_form = [0, 0, 0, 0, 1, 0, 1, 2, 1, 0, 0, 2]
//                 0       1       2
gram_form_tb = ["twoje", "twój", "twoja"]

nice_text = ["", ", smacznego", "~"]

cook_awnser = ["Oto", "Proszę oto", "Wyszło mi... Oto", "Zrobiłam tylko to... proszę", "Proszę", "Udało mi się, oto"]
cook_react = [":3", "^^", "", "(~˘▾˘)~", "~(˘▾˘~)"]
//end
//zamienne rate
rate_awnser = ["Takie", "", "Ale to wspaniałe, daje temu", "TO.JEST.NIE MAM SŁÓW", "Słowa tego nie wyrażą, ale liczby już tak"]
rate_awnser_last = -1
//end
test = "suka suko pierdol,sie pierdol,się spierdalaj szmato kurwo dziwka kurwa szmata chuju chuj"
test_tb = ["suka", "suko", "pierdol", "spierdalaj", "szmato", "kurwo", "dziwka", "kurwa", "szmata", "chuju", "chuj"]
//
foch_tb = []

tam_tb = ["Jeszcze mnie nie wyłączyli jest super! :D", "Jest Dobrzuuuuu~", "Jestem głodna :<", "Rozmyślam sobie o tym jak wygląda trawa... ciekawe..."]

jaszczurka_tb = ["Czemu jaszczurka? <:nani:967873146004832327>", "Jaszczurka!!!🦎🦎🦎🦎", "Kameleon ciągle barwy zmienia <:arinsus:950120893793849384>"]


function init(msg) {
    mess = msg
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

function cook() {
    do {
        food_nb = getRandomInt(food_eng.length) //10
    } while (food_nb == last_food)
    last_food = food_nb

    do {
        awnser_nb = getRandomInt(cook_awnser.length)
    } while (awnser_nb == last_awnser)
    last_awnser = awnser_nb

    react_nb = getRandomInt(cook_react.length)

    nice_rand = getRandomInt(nice_text.length)

    food_emoji = food_eng[food_nb]
    food_name = food_pl[food_nb] //tako

    if (food_many[food_nb]) {
        emoji = `:${food_emoji}::${food_emoji}::${food_emoji}:`
    } else {
        emoji = `:${food_emoji}:`
    }

    out = `${cook_awnser[awnser_nb]} ${gram_form_tb[gram_form[food_nb]]} ${food_pl[food_nb]}${nice_text[nice_rand]} ${emoji} ${cook_react[react_nb]}`
    mess.reply(out)
}

function second(a_pref, client) {
    args_tb = mess.content.toLowerCase().slice(a_pref.length).trim().split(" ")
    cmd = args_tb.shift().toString().replace(/!/g, '').replace('?', '').replace('.', '')
    args = args_tb.toString()
    args = args.replace(/,/g, ' ').replace(/  /g, ', ')
    switch (cmd) {
        case "send":
            if (mess.author.id == config.arin_id || mess.author.id == config.dev_id || mess.author.id == config.kacper_id) {
                main.log(`${mess.author.tag} użył komendy SEND z argumentami:\n${args}`)
                client.channels.cache.get('1001451925818052728').send(args)
            }
            break
        case "bajka":
            if (mess.author.id == config.arin_id || mess.author.id == config.dev_id || mess.author.id == config.kacper_id) {
                client.channels.cache.get('1001451925818052728').send("Czas na bajkę!!" + ``)
            }
            break
        case 'ping':
            mess.reply(`Opóźnienie wynosi ${Math.abs(Date.now() - mess.createdTimestamp)}ms. Opóźnienie API wynosi ${Math.round(client.ws.ping)}ms`)
            break
        case 'help':
            mess.reply("```" + "To okno pomocy...\nem...no to...\n\n\na!ping - pokazuje ping między tobą a mną :>\na!help - to okno...\n\n\nArin gotuj - gotuje jedzonko\nArin pat pat - ...patanie\nArin oceń - oceniam dowolną rzecz / osobę :>\nArin amogus - amogus <: arinsus: 950120893793849384 >\nArin furry - czy jestem furry?...\nArin kiedy ... - jedno z pytanek : 3\nArin bonk ... - BONK!\nArin przytul - TUUULIII!\nArin coin - rzut monętą UwU\nem...\nJeśli znajdziesz jakiś błąd napisz go komendą a!error opisz błąd\nPropozycje piszcie a!prop propozycja\nDziękuje za odzew :> " + "```")
            break
        case 'error':
        case 'erro':
        case 'błąd':
            client.users.fetch(dev_id).then((user) => { user.send(`❌ ${mess.author.tag} zgłasza: ${args}`) })
            client.users.fetch(arin_id).then((user) => { user.send(`❌ ${mess.author.tag} zgłasza: ${args}`) })
            client.users.fetch(kacper_id).then((user) => { user.send(`❌ ${mess.author.tag} zgłasza: ${args}`) })
            // client.users.cache.get('503238867323846663').send(`❌${mess.author.tag} zgłasza: ${args}`)
            // client.users.cache.get('513765611701010432').send(`❌${mess.author.tag} zgłasza: ${args}`)
            mess.reply("Zajmę się tym. Dzięki!")
            break
        case 'prop':
        case 'propozycja':
            client.users.fetch(dev_id).then((user) => { user.send(`✅ ${mess.author.tag} proponuje ${args}`) })
            client.users.fetch(arin_id).then((user) => { user.send(`✅ ${mess.author.tag} proponuje ${args}`) })
            client.users.fetch(kacper_id).then((user) => { user.send(`✅ ${mess.author.tag} proponuje ${args}`) })
            // client.users.cache.get('503238867323846663').send(`✅${mess.author.tag} proponuje ${args}`)
            // client.users.cache.get(kacper_id).send(`✅${mess.author.tag} proponuje ${args}`)
            mess.reply("Propozycja wysłana. Dziękuję :>")

            break
        case 'live':
            const options = {
                url: uri,
                headers: headers_tb
            }
            request.get(options, (err, res, body) => {
                if (err) {
                    mess.reply(err)
                }
                // console.log(body)
                // mess.reply(res.data)
                let json = JSON.parse(body);
                if (json.data[0] == null) return mess.reply("No Live!")
                mess.reply("Live!")
            })
            break
    }
}

function first(a_pref) {
    // active_role = mess.guild.roles.cache.find((role) => role.name == "Aktywny")
    args_tb = mess.content.toLowerCase().slice(a_pref.length).trim().split(" ")
    cmd = args_tb.shift().toString().replace(/!/g, '').replace('?', '').replace('.', '')
    args = args_tb.toString()
    args = args.replace(/,/g, ' ').replace(/  /g, ', ')
    // detect = mess.content.toLowerCase().slice(a_pref.length).split(" ")
    // for (i = 0; i < detect.length; i++) {
    //     if (test_tb.indexOf(detect[i]) != -1) {
    //         gif = getRandomInt(7) + 1
    //         return mess.channel.send("PFFF FOCH!")
    //         return mess.channel.send({ files: [`./ gif / ${ gif }.gif`] })
    //     }
    // }

    switch (cmd) {

        case "popcorn":
            mess.channel.send(`${mess.author.username} oto twój popcorn :popcorn: `)
            break
        //------------------------------------
        case "ciasteczko":
        case "ciastko":
            mess.channel.send(`${mess.author.username} oto twoje ciasteczko :3 :cookie: `)
            break
        //------------------------------------
        case "pierogi":
            mess.channel.send(`${mess.author.username} oto twoje pierogi :3  :dumpling::dumpling::dumpling: `)
            break
        //------------------------------------
        case "gotuj":
        case "ugotujesz":
        case "ugotuj":
            cook()
            break
        //------------------------------------
        case "amogus":
            mess.channel.send("AMOGUS! <:arinsus:950120893793849384>")
            break
        //------------------------------------
        case 'pat':
            mess.reply(`* pat pat ${mess.author.username} * <a:ArinPATPAT:967876510688092221> <a:ArinPATPAT:967876510688092221> <a:ArinPATPAT:967876510688092221> `)
            break
        //------------------------------------
        case 'odklejka':
            mess.reply("żyjemy w jednej wielkiej symulacji!\nWsystko to symulacja!!!!!!!!1111jednejeden")
            break
        //------------------------------------

        case 'furry':
            mess.reply("NIE JESTEM FURRASEM!")
            break
        //------------------------------------

        case 'kiedy':
            mess.reply("Nie mnie się pytaj, pytaj się mamy :3")
            break
        //------------------------------------

        case 'jaszczurka':
            mess.reply(jaszczurka_tb[getRandomInt(3)])
            break
        //------------------------------------
        case "bonk":
            if (args != "") {
                return mess.reply(`BONK! ${args}`)
            }
            mess.reply("*bonk*")
            break
        case "hug":
        case 'przytul':
        case 'przytul!':
        case 'przytulisz':
        case 'przytulisz?':
        case 'tulu!':
        case 'tuli!':
        case 'tuli':
        case 'tuli?':
        case 'tulu':
        case 'tulu?':
            mess.channel.send(`* Tuuuliiii * <@!${mess.author.id}> <:tuli:976065537194983464><:tuli:976065537194983464> `)
            break
        //------------------------------------
        case "uwu":
            mess.reply("UwUśnie!")
            break
        case "oceń":
        case "ocen":
        case "rate":
            result = getRandomInt(13)
            if ((mess.author.id == '773914086051676180' && args == "mnie") || args == "nelaxos") result = result + 5
            do {
                r_awnser = getRandomInt(rate_awnser.length)
            } while (r_awnser == rate_awnser_last)
            rate_awnser_last = r_awnser

            if (args != "" || args != " ") {
                mess.channel.send(`${rate_awnser[r_awnser]} ${result} /10`)
            } else {
                mess.reply("Co mam ocenić?!")
            }
            break
        //------------------------------------
        case "coin":
            result = getRandomInt(2)

            switch (result) {
                case 1:
                    mess.channel.send("Wypadła reszka!")
                    break

                case 0:
                    mess.channel.send("Wypadł orzeł!")
                    break
            }
            break
        // Pytanka!
        case "ile":
            if (args == "masz lat?") {
                mess.reply("19 hyhy")
            } else if (args == "masz lat") {
                mess.reply("Pytania kończy się znakiem zapytania PF!")
            } else {
                mess.reply("Cytując nauczycielki Matematyki...\nIle czego? pomarańczy jabłek?!")
            }
            break
        case "co":
            if (args == "lubisz?") {
                mess.reply("To samo co żywa Arin ^^")
            } else if (args == "lubisz") {
                mess.reply("Pytanka kończy się znakiem zapytania...")
            } else if (args == "tam u ciebie?") {
                mess.reply(tam_tb[getRandomInt(4)])
            } else if (args == "tam u ciebie") {
                mess.reply(tam_tb[getRandomInt(4)])
            } else if (args == "tam") {
                mess.reply(tam_tb[getRandomInt(4)])
            } else if (args == "tam?") {
                mess.reply(tam_tb[getRandomInt(4)])
            } else {
                mess.reply("Ale co, co?")
            }
            break
        case "kocham":
            if (args == "") return mess.reply("Ale cio kochasz?")
            if (args == "cię" || args == "cie") {
                return mess.reply("A ja ciebie pomidorku :>")
            }
            mess.reply("UUU SHIP!")
            break
        case "kochasz":
            if (args == "mnie?") {
                if (mess.author.id == '948686451669872640') return mess.reply("Emmm... Ciebie akurat nie...\n\n\n\n\n\n Żartowałam ciebie też kocham jak każdego pomidorka!")

                mess.reply("Jak każdego pomidorka!")
            } else if (args == "mnie") {
                if (mess.author.id == '948686451669872640') return mess.reply("Emmm... Ciebie akurat nie...\n\n\n\n\n\n Żartowałam ciebie też kocham jak każdego pomidorka!")

                mess.reply("TAAAK ^^, Jak każdego pomidorka!")
            } else {
                mess.reply("TAAAAK :> UWU")
            }
            break
        case "help":
        case "pomocy":
            mess.reply("Jeśli czegoś potrzebujesz zerknij na kanał <#932366685149753364> lub na <#932773862687518780> żeby myknąć role!\nJeśli potrzebujesz pomocy z botem użyj komendy a!help :>")
            break
        case "streamy":
            mess.reply("Streamy mamy są od poniedziału do piątku o 18:00. Dokładny Harmonogram znajdziesz na <#934982031052505169>")
            break
        default:
            if (mess.author.id == arin_id) return mess.reply("Słucham Mamusiu? <:nani:967873146004832327><:nani:967873146004832327><:nani:967873146004832327>")
            if (mess.author.id == kacper_id) return mess.reply("Słucham Tatusiu? <:nani:967873146004832327><:nani:967873146004832327><:nani:967873146004832327>")
            mess.reply("Słucham? <:nani:967873146004832327><:nani:967873146004832327><:nani:967873146004832327>")
            break
        //------------------------------------
        // case "help":
        //   mess.channel.send(
        //     "```Komendy do Asia-Chan bot!\na!popcorn - Asia da ci popcorn!\na!ciasteczko - Asia da ci ciasteczko!\na!coin - rzut monetą!\na!ciastko - Asia da ci ciastko!\na!pierogi - Asia da ci pierogi!\na!hug - Asia cię przytuli :3\na!gotuj - ugotuje ci losowe danie! :3\na!help - to okienko :3```",
        //   )
        //   break
        //------------------------------------
        // case "version":
        // case "wersja":
        // //   mess.channel.send("```Arin Bot wersja 1.0.0\nChangelog:\n-Asia odpowiada wszędzie, ale gotuje tylko w kuchni ```")
        //   break
        //------------------------------------
    }
}

exports.start = first
exports.dev = second
exports.init = init