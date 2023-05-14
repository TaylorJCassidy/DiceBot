const helpEmbed = require('../utils/helpEmbed.js');

module.exports = {
    name: 'getmod',
    run: function(msg, args) {
        if (args.length == 0) {
            const prefix = msg.guild.cache.getPrefix();
            const help = 
            `Gets the D&D modifier of any positive whole number e.g:\n\
            \n${prefix}getmod <number>\
            \n${prefix}getmod 10  Would return 0\
            \n${prefix}getmod 20  Would return +5\
            \n${prefix}getmod 1   Would return -5`;
            msg.channel.send(helpEmbed(help, 'Getmod Info'));
        }
        else {
            if (!/^(\d{1,5})$/.test(args)) {
                msg.reply('The number provided is not a positive whole number, or is too large.');
            }
            else {
                msg.reply(this.getMod(args));
            }
            
        }
    },
    getMod: function(number) {
        number = parseInt(number);
        return (number > 9 ? '+' : '') + Math.floor((number-10)/2);
    }
};