const color = parseInt(require('../../configs/app.json').theme.colour, 16);

module.exports = {
    diceRegex: new RegExp(/^((((\d{0,2}d\d{1,3})|-?\d{1,3}) *[\+\-\*\/] *)*(\d{0,2}d\d{1,3})( *[\+\-\*\/] *\d{1,3})*( *~ *(res|vul|a|d))*)$/, 'i'),

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