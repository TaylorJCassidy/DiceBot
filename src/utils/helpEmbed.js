const { MessageEmbed } = require("discord.js");

module.exports = {
    /**
     * The default bot embeded message
     * @param {String} content the embeded message's content
     * @param {String} title the embeded message's title
     * @returns {MessageEmbed} the generated embeded message
     */
    helpEmbed: (content,title) => {
        return new MessageEmbed().setDescription('```' + content + '```').setTitle(title).setFooter('https://github.com/TaylorJCassidy/DiceBot');
    }
}