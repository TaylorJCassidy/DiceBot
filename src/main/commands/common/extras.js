const color = parseInt(require('../../configs/app.json').theme.colour, 16);

module.exports = {
    diceRegex: new RegExp(/^\d*d\d+([+-]\d*d?\d+)*( ?~\w+)*$/, 'i'),

    helpEmbed: (content, title) => {
        const embed = {
            title: title,
            description: '```' + content + '```',
            footer: {
                text: 'https://github.com/TaylorJCassidy/DiceBot'
            },
            color
        };
        return {embeds: [embed]};
    }
};