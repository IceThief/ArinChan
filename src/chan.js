const config = require("./config.js")
const cook = require('./cook.js')
const emoji = require("./emoji.js")
const prefix = config.prefix_chan

const ID = [config.arin_id, config.kacper_id, config.ice_id]

const uwu_tb = [`UwUśne uwu`, `Ja nie powiem uwu?! *foch*`, `UwU to jesteście wy pomidorki!`]
const pat_pat_tb = [`Pat pat {ping} ${emoji.patpat}${emoji.patpat}`, `PATAŃSKO! {ping} ${emoji.patpat}`, `Ale że ja? UwUśnie! Pat pat {ping} ${emoji.patpat}`, `Dziękuje że mogę cię wypatać {ping} ${emoji.patpat}${emoji.patpat}${emoji.patpat}${emoji.patpat}${emoji.patpat}${emoji.patpat}${emoji.patpat}${emoji.patpat}${emoji.patpat}${emoji.patpat}`]
const tuli_tb = [`Pora na tulaskiii ziuuuuu {ping} ${emoji.tuli} `, `*tuliiiiiiii* {ping} ${emoji.tuli}`, `Pora przytulić {ping} BÓJ SIĘ! ${emoji.tuli}`, `Uciekaj {ping}! nadciąga Arin z dużym tulaaaaseeeem! ${emoji.tuli}${emoji.tuli}${emoji.tuli}`]
const jaszczurka_tb = ["ZIUUUUUUUUU", `NIUUUUUUUUU`, `GEMKON ZIUUUUUUUU`, `GEMKON NIUUUUUUUU`, `JAMSZCZURKA pycy pycy`]
const tam_tb = ["Jeszcze mnie nie wyłączyli jest super! :D", "Jest Dobrzuuuuu~", "Jestem głodna :<", "Rozmyślam sobie o tym jak wygląda trawa... ciekawe..."]
const odklejka_tb = ["Ketchup to tak naprawdę dżem z pomidorów.\nNiegrzecznych pomidorów...", "Rosół to kompot z kurczaka", "Sakramusz, Skarabeusz, Chłop z talerzem na głowie!", "Szukaj a miej innych w dupie~", "Dajcie klej odkleiłam się!\nPOMOCY!", "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee...\ntak!", "Czekajcie laga mam...", "Żyjemy w jednej wielkiej symulacji!\nWsystko to symulacja!!!!!!!!1111jedenjeden", "ZIEMIA JEST PŁASKA!", "Przepraszam, widziałam zdjęcia..."]
const kocham_cie_tb = [`😊😊😊`, `awwwwwww`, `UwUśnie`, `Jestem zajęta...`]
const kochasz_mnie_tb = [`Jak każdego pomidorka!`, `TAAAAAK <3`, `może... 😊`, `Nie powiem ci bo się wstydzę 😊`]
const kochasz_cos_tb = [`TAK!`, `TAAAAAK KOCHAM {args} <3`, `może... hihi~`, `Nie powiem ci bo się tego bardzo wstydzę...`]
const kocham_cos_tb = [`Awww UwUśnie ${emoji.uwu}`, `UUU SHIP IT WIDZOWIE!`, `JA TEŻ!`]
const rate_tb = ["Takie", "", "Ale to wspaniałe, daje temu", "TO.JEST.NIE MAM SŁÓW", "Słowa tego nie wyrażą, ale liczby już tak", "A oto mój werdykt pomidorku", "Co myśle o {args}? TO JEST"]
const rps = [{ name: "kamień", win: "nożyczki", lose: "papier" }, { name: "nożyczki", win: "papier", lose: "kamień" }, { name: "papier", win: "kamień", lose: "nożyczki" }]

var last = [{ name: 'patpat', value1: 0, value2: 0 }, { name: 'jaszczurka', value1: 0, value2: 0 }, { name: "cotam", value1: 0, value2: 0 }, { name: "odklejka", value1: 0, value2: 0 }, { name: "tuli", value1: 0, value2: 0 }, { name: 'ocen', value1: 0, value2: 0 }, { name: 'uwu', value1: 0, value2: 0 }, { name: "kocham_cie", value1: 0, value2: 0 }, { name: 'kochasz_mnie', value1: 0, value2: 0 }, { name: 'kocham_cos', value1: 0, value2: 0 }, { name: 'kochasz_cos', value1: 0, value2: 0 }]
// arin_waifu
const getRandomInt = (max) => { return Math.floor(Math.random() * Math.floor(max)) }

const getRandomText = (tb, name) => {
    x = last.findIndex((a) => a.name == name)
    console.log(`value1=${last[x].value1} value2=${last[x].value2}`)
    do {
        v = getRandomInt(tb.length)
        console.log(v)
    } while (v == last[x].value1 || v == last[x].value2)
    last[x].value2 = last[x].value1
    last[x].value1 = v
    console.log(`v=${v} value1=${last[x].value1} value2=${last[x].value2}`)
    return tb[v]
}

function test_user(user_id) {
    a = config.db.prepare("SELECT * FROM users WHERE ID = ?").get(user_id)
    if (a.Foch == 'true')
        return true
    return false

}

function start(msg, client) {
    msg_content = msg.content.toLowerCase().slice(prefix.length).trim()
    args_tb = msg_content.split(" ")
    cmd = args_tb.shift().toString().replace(/!/g, '').replace('?', '').replace('.', '')
    args = args_tb.toString()
    args = args.replace(/,/g, ' ').replace(/  /g, ', ')
    switch (cmd) {
        case 'cook':
        case 'ugotuj':
        case 'gotuj':
        case 'ugotujesz':
        case 'przygotuj':
            if (msg.channel.id != config.kitchen_channel) return msg.reply(`Nie mam jak tu gotować, sprzęt mam tylko tu: <#${config.kitchen_channel}>`)
            cook.cook(msg, client)
            break
        case 'popcorn':
            msg.reply("Proszę oto twój popcorn :popcorn:")
            break
        case "amogus":
            msg.channel.send(`Amogous sussous!!! ${emoji.arinsus}`)
            break
        //------------------------------------
        case 'pat':
            if (msg.mentions.users.first()) {
                console.log(msg.mentions.users.first())
                if (test_user(msg.mentions.users.first().id)) return msg.reply(`Jestem ofochana na <@!${msg.mentions.users.first().id}>\nNIE BĘDZIE PATANIA :middle_finger:`)
                return msg.channel.send(`${getRandomText(pat_pat_tb, "patpat").replace("{ping}", `<@!${msg.mentions.users.first().id}>`)}\nPat pat wysłał/a <@!${msg.author.id}>`)
            }
            msg.reply(`${getRandomText(pat_pat_tb, "patpat").replace("{ping}", `<@!${msg.author.id}>`)}`)
            break
        //------------------------------------
        case 'odklejka':
            msg.reply(getRandomText(odklejka_tb, 'odklejka'))
            break
        //------------------------------------
        case 'kiedy':
            msg.reply("Nie mnie się pytaj, pytaj się mamy :3")
            break
        //------------------------------------
        case 'jaszczurka':
            msg.reply(getRandomText(jaszczurka_tb, 'jaszczurka'))
            break
        //------------------------------------
        case "jesteś":
        case "jestes":
            switch (args) {
                case "cute":
                    msg.reply("Weź przestań bo się zarumienie :relaxed:")
                    break
                case "furry":
                    config.db.prepare('UPDATE users SET Foch = ?, Powod = ? WHERE ID = ?').run("true", "furry", msg.author.id)
                    msg.reply("foch")
                    break
                case 'agrest':
                    config.db.prepare('UPDATE users SET Foch = ?, Powod = ? WHERE ID = ?').run("true", "agrest", msg.author.id)
                    msg.reply("Sam/a jesteś agrest! PFF")
                    break
                case "głupia":
                case "glupia":
                    config.db.prepare('UPDATE users SET Foch = ?, Powod = ? WHERE ID = ?').run("true", "głup", msg.author.id)
                    msg.reply("foch")
                    break
                case "agresywna":
                    test = getRandomInt(2)
                    switch (test) {
                        case 0:
                            msg.reply("Hihihi taka już jestem~")
                            break
                        case 1:
                            msg.reply("FOCH NIE JESTEM!!")
                            config.db.prepare('UPDATE users SET Foch = ?, Powod = ? WHERE ID = ?').run("true", "agres", msg.author.id)

                            break
                    }
                    break
                case 'uwu':
                case 'uwuśna':
                case 'uwusna':
                    msg.reply("TY BARDZIEJ!")
                    break
                case 'pomidorkiem':
                case 'pomidorem':
                    msg.reply("Jestem waszą królową!")
                    break
            }
            break
        case 'dziękuje':
        case 'dziękuję':
        case 'dziekuję':
        case 'dziekuje':
        case 'dzieki':
        case 'dzięki':
            msg.reply(`Proszę bardzo pomidorku ${emoji.pomi_UWU}`)
            break
        case 'furry':
            msg.reply("Nie jestem FURRY!!! FOCH!")
            config.db.prepare('UPDATE users SET Foch = ?, Powod = ? WHERE ID = ?').run("true", "furry", msg.author.id)
            break
        //------------------------------------
        case 'przepraszam':
        case 'pseplasiam':
            a = config.db.prepare("SELECT * FROM users WHERE ID = ?").get(msg.author.id)
            if (a.Foch != "true") return msg.reply("Nie masz za co mnie przepraszać :3")
            if (msg_content.includes(a.Powod)) {
                if (args.length < 10) return msg.reply("Postaraj się bardziej z przeprosinami")
                config.db.prepare("UPDATE users SET Foch = ? WHERE ID = ?").run("false", msg.author.id)
                return msg.reply("Wybaczam ci :3")
            }
            msg.reply("Nie za to jestem obrażona PFF!")
            break
        //------------------------------------
        case "bonk":
            if (msg.mentions.users.first()) {
                if(msg.mentions.users.first().id == client.user.id){
                    return msg.reply(`NIE\nBONKAJ\nMNIE!\n*BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}\n*BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}\n*BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}\n*BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}\n*BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}\n*BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}\n*BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}\n*BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}\n*BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}`)
                }
                return msg.channel.send(`<@!${msg.mentions.users.first().id}> *BONK!* ${emoji.bonkcat}${emoji.bonkcat}${emoji.bonkcat}\nOd <@!${msg.author.id}>`)
            }
            msg.reply(`*bonk* <@!${msg.author.id}>`)
            break
        case 'hug':
        case 'przytul':
        case 'przytulisz':
        case 'tuli':
        case 'tulu':
            if (msg.mentions.users.first()) {
                console.log(msg.mentions.users.first())
                if (test_user(msg.mentions.users.first().id)) return msg.reply(`Jestem ofochana na <@!${msg.mentions.users.first().id}>\nTULI NIE DLA CIEBIE :middle_finger:`)

                return msg.channel.send(`${getRandomText(tuli_tb, 'tuli').replace("{ping}", `<@!${msg.mentions.users.first().id}>`)}\nTuli wysyła <@!${msg.author.id}> ${emoji.pomi_hearth}`)
            }
            msg.channel.send(getRandomText(tuli_tb, 'tuli').replace("{ping}", `<@!${msg.author.id}>`))
            break
        //------------------------------------
        case "uwu":
            msg.reply(`${getRandomText(uwu_tb, 'uwu')}`)
            break
        case "oceń":
        case "ocen":
        case "rate":
            if (args == "" || args == " ") { return msg.reply("Co mam ocenić pomidorku?") }
            rate = getRandomInt(13)
            msg.reply(getRandomText(rate_tb, 'ocen').replace("{args}", args) + " " + rate + "/10")
            break
        //------------------------------------

        // Pytanka!
        case "ile":
            switch (args) {
                case "masz lat?":
                    msg.reply("19 hyhy")
                    break
                case "masz lat":
                    msg.reply("Pytania kończy się znakiem zapytania PF!")
                    break
                default:
                    msg.reply("Cytując nauczycielki Matematyki...\nIle czego? pomarańczy jabłek?!")
                    break
            }
            break
        case "co":
            switch (args) {
                case 'lubisz?':
                    msg.reply("To samo co żywa Arin ^^")
                    break
                case 'lubisz':
                    msg.reply("Pytanka kończy się znakiem zapytania...")
                    break
                case 'tam u ciebie':
                case 'tam u ciebie?':
                case 'tam':
                case 'tam?':
                    msg.reply(getRandomText(tam_tb, 'cotam'))
                    break
                default:
                    msg.reply("Ale co, co?")
                    break
            }
            break
        case "kocham":
            switch (args) {
                case '':
                case ' ':
                    msg.reply("Ale cio kochasz?")
                    break
                case 'cię':
                case 'cie':
                    msg.reply(getRandomText(kocham_cie_tb, 'kocham_cie'))
                    break
                default:
                    msg.reply(getRandomText(kocham_cos_tb, 'kocham_cos'))
                    break
            }
            break
        case "kochasz":
            switch (args) {
                case 'mnie':
                case 'mnie?':
                    msg.reply(getRandomText(kochasz_mnie_tb, "kochasz_mnie"))
                    break
                default:
                    msg.reply(getRandomText(kochasz_cos_tb, "kochasz_cos").replace('{args}', args).replace('?', ""))
                    break
            }
            break
        case "jak":
            switch (args) {
                case "się masz?":
                case "sie masz?":
                case "się masz":
                case "sie masz":
                case "tam":
                case "tam?":
                    msg.reply(getRandomText(tam_tb, 'cotam'))
                    break
            }
            break
        case "help":
        case "pomocy":
        case "pomoc":
            msg.reply(`Jeśli czegoś potrzebujesz zerknij na kanał <#${config.rules_channel}> lub na <#${config.roles_channel}> żeby myknąć role!\nJeśli potrzebujesz pomocy z botem użyj komendy ${config.prefix_command}help :>`)
            break
        case "streamy":
            msg.reply(`Streamy mamy są od poniedziału do piątku o 18:00. Dokładny Harmonogram znajdziesz na <#${config.twitch_channel}>`)
            break
        case "gra":
        case "zagrajmy":

            rand = rps[getRandomInt(rps.length)]

            console.log(rand)
            switch (args) {
                case 'kamien':
                case 'kamień':
                    if (rand.name == "kamień") return msg.reply("Remis... JESZCZE RAZ!\n\n\n\n\nplosię...")
                    if (rand.win == "kamień") return msg.reply("Papier! Ha wygrałam!")
                    if (rand.lose == "kamień") return msg.reply("P-P-Przegrałam?! :cry: :cry: :cry: :cry: ")
                    break
                case 'papier':
                    if (rand.name == "papier") return msg.reply("Remis... JESZCZE RAZ!\n\n\n\n\nplosię...")
                    if (rand.win == "papier") return msg.reply("Nożyczki! Ha wygrałam!")
                    if (rand.lose == "papier") return msg.reply("P-P-Przegrałam?! :cry: :cry: :cry: :cry: ")
                    break
                case 'nożyczki':
                case 'nozyczki':
                case 'nożyce':
                case 'nozyce':
                    if (rand.name == "nożyczki") return msg.reply("Remis... JESZCZE RAZ!\n\n\n\n\nplosię...")
                    if (rand.win == "nożyczki") return msg.reply("Kamień! Ha wygrałam!")
                    if (rand.lose == "nożyczki") return msg.reply("P-P-Przegrałam?! :cry: :cry: :cry: :cry: ")
                    break
                case ' ':
                case '':
                    msg.reply("Co wybierasz?\nKamień, papier czy nożyce?")
                    break
                default:
                    msg.reply(`To kamień, papier i nożyce, a nie kamień, papier, nożyce i ${args}`)
            }
            break
        default:

            if (ID.indexOf(msg.author.id) != -1) {
                switch (ID.indexOf(msg.author.id)) {
                    case 0:
                        msg.reply(`Słucham Mamusiu? ${emoji.nani}${emoji.nani}${emoji.nani}`)
                        // client.users.fetch(ID[0]).then((user) => { user.send(`❌ ${msg.author.tag} wysłał komendę: ${msg_content}\nKtóra nie jest obsługiwana!`) })
                        break
                    case 1:
                        msg.reply(`Słucham Tatusiu? ${emoji.nani}${emoji.nani}${emoji.nani}`)
                        // client.users.fetch(ID[1]).then((user) => { user.send(`❌ ${msg.author.tag} wysłał komendę: ${msg_content}\nKtóra nie jest obsługiwana!`) })
                        break
                    case 2:
                        msg.reply(`Tak? ${emoji.nani}${emoji.nani}${emoji.nani}`)
                        client.users.fetch(ID[2]).then((user) => { user.send(`❌ ${msg.author.tag} wysłał komendę: ${msg_content}\nKtóra nie jest obsługiwana!`) })
                        break
                    case 3:
                        msg.reply(`Słucham najlepsza Ciociu? ${emoji.nani}${emoji.nani}${emoji.nani}`)
                        // client.users.fetch(ID[3]).then((user) => { user.send(`❌ ${msg.author.tag} wysłał komendę: ${msg_content}\nKtóra nie jest obsługiwana!`) })
                        break
                    default:
                        msg.reply(ID.indexOf(msg.author.id).toString())
                }
                return
            }
            msg.reply(`Słucham <@!${msg.author.id}>? ${emoji.nani}${emoji.nani}${emoji.nani}`)
            break
    }
}


exports.start = start