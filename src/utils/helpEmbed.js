const { MessageEmbed } = require("discord.js");
const {colour} = require('../../configs/config/theme.json');

module.exports = {
    /**
     * The default bot embeded message
     * @param {String} content the embeded message's content
     * @param {String} title the embeded message's title
     * @returns {MessageEmbed} the generated embeded message
     */
    helpEmbed: (content,title) => {
        const embed = {
            title: title,
            description: '```' + content + '```',
            footer: {
                text: 'https://github.com/TaylorJCassidy/DiceBot'
            },
            color: colour
        };
        return new MessageEmbed(embed);
    }
};