const {colour} = require('../app.json').theme;

/**
 * The default bot embeded message
 * @param {String} content the embeded message's content
 * @param {String} title the embeded message's title
 * @returns {MessageEmbed} the generated embeded message
 */
module.exports = (content,title) => {
    const embed = {
        title: title,
        description: '```' + content + '```',
        footer: {
            text: 'https://github.com/TaylorJCassidy/DiceBot'
        },
        color: parseInt(colour,16)
    };
    return {embeds: [embed]};
};