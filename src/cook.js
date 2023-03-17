const food = [{ name: "ciasteczko", many: false, gram: 'twoje', emoji: ':cookie:' }, { name: 'pierogi', many: true, gram: "twoje", emoji: ':dumpling:' }, { name: 'udko z kurczaka', many: false, gram: 'twoje', emoji: ':poultry_leg:' }, { name: 'sushi', many: false, gram: 'twoje', emoji: ':sushi:' }, { name: 'hotdog', many: false, gram: 'twój', emoji: ':hotdog:' }, { name: 'frytki', many: true, gram: 'twoje', emoji: ':fries:' }, { name: 'popcorn', many: false, gram: "twój", emoji: ':popcorn:' }, { name: 'ramen', many: false, gram: 'twój', emoji: ':ramen:' }, { name: 'kawałek pizzy', many: false, gram: "twój", emoji: ":pizza:" }, { name: 'miska ryżu', many: false, gram: 'twoja', emoji: ':rice:' }, { name: "taco", many: false, gram: 'twoje', emoji: ':taco:' }, { name: 'ciasto', many: false, gram: 'twoje', emoji: ':cake:' }, { name: "cegła", many: false, gram: 'twoja', emoji: ':bricks:' }, { name: 'pizza', many: true, gram: 'twoja', emoji: ':pizza:' }, { name: 'nic', many: false, gram: 'twoje', emoji: ':middle_finger:' }]

const config = require("./config.js")

const nice_text = ["", ", smacznego", "~"]

const cook_awnser = ["Oto", "Proszę oto", "Wyszło mi... Oto", "Zrobiłam tylko to... proszę", "Proszę", "Udało mi się, oto"]
const cook_react = [":3", "^^", "", "(~˘▾˘)~", "~(˘▾˘~)"]

var last = [{ name: 'awnser', value1: 0, value2: 0 }, { name: 'nice', value1: 0, value2: 0 }, { name: 'react', value1: 0, value2: 0 }, { name: 'food', value1: 0, value2: 0 }]


function test_user(user_id) {
    a = config.db.prepare("SELECT * FROM users WHERE ID = ?").get(user_id)
    if (a.Foch == 'true')
        return true
    return false

}

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

function cooking(msg, client) {
    let nice = getRandomText(nice_text, 'nice')
    let awnser = getRandomText(cook_awnser, 'awnser')
    let react = getRandomText(cook_react, 'react')
    let food_obj = getRandomText(food, 'food')
    emoji = food_obj.emoji
    if (food_obj.many) emoji = `${food_obj.emoji}${food_obj.emoji}${food_obj.emoji}`
    if (msg.mentions.users.first()) {
        if (test_user(msg.mentions.users.first().id)) return msg.reply(`Jestem ofochana na <@!${msg.mentions.users.first().id}>`)
        return msg.reply(`<@!${msg.mentions.users.first().id}> ${awnser} ${food_obj.gram} ${food_obj.name}${nice} ${emoji} ${react}\nZlecenie od <@!${msg.author.id}>!`)
    }
    msg.reply(`${awnser} ${food_obj.gram} ${food_obj.name}${nice} ${emoji} ${react}`)
}

exports.cook = cooking
//["ciastko", "pierogi", "udko z kurczaka", "sushi", "hotdog", "frytki", "ramen", "pizza", "ryż", "tako", "ciasto", "cegła"]