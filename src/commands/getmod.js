module.exports = {
    name: 'getmod',
    run: function(msg,args) {
        if (args.length == 0) {
            const Discord = require('discord.js');

            const prefix = msg.guild.cache.getPrefix();
            const help = 
            `Gets the D&D modifier of any whole number e.g:\n\
            \n${prefix}getmod <number>\
            \n${prefix}getmod 10 - Would return 0\
            \n${prefix}getmod 20 - Would return +5\
            \n${prefix}getmod 1  - Would return -5`;
            
            const finalHelp = new Discord.MessageEmbed().setDescription('```' + help + '```').setTitle('Getmod Info');
            msg.channel.send(finalHelp);
        }
        else {
            if (!/^(\d{1,5})$/.test(args)) {
                msg.reply('The number provided is not a number, or is too large.')
            }
            else {
                msg.reply(this.getMod(args));
            }
            
        }
    },
    getMod: function(number) {
        number = parseInt(number);
        return (number > 9 ? '+' : '') + Math.floor((number-10)/2)
    }
}