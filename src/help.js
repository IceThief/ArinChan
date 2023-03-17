const emoji = require("./emoji.js")
const config = require("./config.js")
const embed = require("./embed_builder.js")
const { prefix_chan, prefix_command } = require("./config.js")

const chan = [{ name: `${prefix_chan} ugotuj`, value: `Gotowanko tylko na <#${config.kitchen_channel}>` }, { name: `${prefix_chan} amogus`, value: `SUS!` }, { name: `${prefix_chan} pat pat`, value: `Patańsko!` }, { name: `${prefix_chan} odklejka`, value: `Odklejona Arin!` }, { name: `${prefix_chan} kiedy`, value: `Zapytaj się mnie kiedy` }, { name: `${prefix_chan} jaszczurka`, value: `zobacz jak robi jaszczurka` }, { name: `${prefix_chan} bonk`, value: `bonknij mnie lub kogoś` }, { name: `${prefix_chan} tuli`, value: `przytul mnie lub kogoś` }, { name: `${prefix_chan} UwU`, value: `UwU` }, { name: `${prefix_chan} oceń`, value: `oceń coś` }, { name: `${prefix_chan} ile masz lat`, value: `dowiedz się ile Arin ma lat!` }, { name: `${prefix_chan} co lubisz?`, value: `Dowiedz się co lubi Arin!` }, { name: `${prefix_chan} co tam?`, value: `dowiedz się co słychać u Arin!` }, { name: `${prefix_chan} kocham cię`, value: `<3` }, { name: `${prefix_chan} kocham <coś>`, value: `<3` }, { name: `${prefix_chan} kochasz mnie?`, value: `Dowiedz się czy Arin cię kocha` }, { name: `${prefix_chan} kochasz coś`, value: `<3` }, { name: `${prefix_chan} pomoc`, value: `Poproś Arin o pomoc` }, { name: `${prefix_chan} stream`, value: `Dowiedz się jaki jest plan streamów` }]

const cmd = [{ name: `${prefix_command}ping`, value: `Sprawdź opóźnienie` }, { name: `${prefix_command}help`, value: `To okno` }, { name: `${prefix_command}error`, value: `Zgłoś błąd z botem` }, { name: `${prefix_command}prop`, value: `Zaproponuj coś` }, { name: `${prefix_command}moneta`, value: `Rzuć monetą` }]

function show_help(msg) {
    msg.reply({ embeds: [embed.help_embed(chan), embed.help_embed(cmd, '#80DAF5')] })
}


exports.show_help = show_help

// help = `To jest okno pomocy!\nTutaj możesz znaleźć wszelką pomoc dot. bota Ogrodnik Arincja! ${emoji.uwu}\nObecne prefixy to: ${config.prefix_chan} i ${config.prefix_chan}\nKomendy dla ${config.prefix_chan} (jeśli oznaczysz kogoś w komendzie stanie się coś innego~):\n{p} ugotuj - Działa jedyne na kanale <#${config.kitchen_channel}>, Arin może ugotować\n{p} amongus - AMOGUS!!!\n{p}pat pat - patanie!!!! ${emoji.patpat}\n{p} odklejka - ey pomoźcie mi to nie jest śmieszne!\n{p} bonk - BONK\n{p} jaszczurka - Gekon!\n{p} tuli - TULASKI!\n{p} UwU - UWWUWUWWUWUWU\n{p} oceń - oceniam wszystko! Od ciebie po psa twojego wujka cioci koleżanki :3\n{p} streamy - dowiedz się więcej o stremach mamy!\n{p} pomoc - zawsze służe pomocą UwU :3`