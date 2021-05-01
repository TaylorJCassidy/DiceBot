module.exports = {
    name: 'rig',
    run: function(msg,args) {
        args = args.split(' ');
        if (args.length > 1) {
            msg.reply(`Invalid format ${msg.guild.cache.getPrefix()}rig high/low/status/toggle`)
        }
        else {
            let rigged = msg.guild.cache.getRigged();
            switch(args.shift()) {
                case 'high':
                    if (rigged != 2) {
                        msg.guild.cache.setRigged(2);
                        msg.reply('Dice is now rigged for maximum.');
                    }
                    else {
                        msg.reply('Dice is no longer rigged');
                        msg.guild.cache.setRigged(0);
                    }
                    break;
                case 'low':
                    if (rigged != 1) {
                        msg.guild.cache.setRigged(1);
                        msg.reply('Dice is now rigged for minimum.');
                    }
                    else {
                        msg.reply('Dice is no longer rigged');
                        msg.guild.cache.setRigged(0);
                    }
                    break;
                case 'status':
                    if (rigged == 1) {
                        msg.reply('The dice is rigged for minimum.');
                    }
                    else if (rigged == 2) {
                        msg.reply('The dice is rigged for maximum.');
                    }
                    else {
                        msg.reply('The dice is not rigged.');
                    }
                    break;
                case 'toggle':
                    break;
                case 'help':
                default:
                    const Discord = require('discord.js');
                    const prefix = msg.guild.cache.getPrefix();
                    const help = `Can be used to rig any dice rolled within this server\
                    \nTo rig a dice:\n\
                    \n${prefix}rigged high   - Rigs the dice to only roll the maximum value\
                    \n${prefix}rigged low    - Rigs the dice to only roll the minimum value\
                    \n${prefix}rigged status - Shows the current rig status\
                    \n${prefix}rigged toggle - Toggles whether the dice can be rigged`;
                    const finalHelp = new Discord.MessageEmbed().setDescription('```' + help + '```').setTitle('Rig Info');
                    msg.channel.send(finalHelp);
            }
        }
        
    }
}