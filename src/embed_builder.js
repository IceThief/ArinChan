const { EmbedBuilder } = require('discord.js')

var twitch_embed = (title, image) => {
    return new EmbedBuilder()
        .setColor("#fc8eac")
        .setTitle(title)
        .setURL('https://twitch.tv/arin_waifu')
        .setAuthor({ name: 'Arin Waifu streamuje!', iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/8ecc230e-8c37-4bc2-8ced-11e136b567ae-profile_image-70x70.png' })
        .setImage(image.replace("{width}", "1920").replace("{height}", "1080"))
        .setTimestamp()
        .setFooter({ text: 'Ogrodnik Arincja' })
}

var help_embed = (tb, color = "#fc8eac") => {
    test = new EmbedBuilder()
        .setColor(color)
        .setTitle("To jest okno pomocy!")
    for (i = 0; i < tb.length; i++) {
        test.addFields({ name: `${tb[i].name[0].toUpperCase() + tb[i].name.substr(1)}`, value: `${tb[i].value[0].toUpperCase() + tb[i].value.substr(1)}` })
    }
    return test

}

exports.twitch_embed = twitch_embed
exports.help_embed = help_embed