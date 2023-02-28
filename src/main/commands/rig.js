module.exports = {
    name: 'rig',
    run: function(msg,args) {
        args = args.split(' ');
        if (args.length > 1) {
            msg.reply(`Invalid format ${msg.guild.cache.getPrefix()}rig high/low/status/toggle`);
        }
        else {
            let rigged = msg.guild.cache.getRigged();
            switch(args.shift()) {
                case 'high':
                    if (rigged != -1) {
                        if (rigged != 2) {
                            msg.guild.cache.setRigged(2);
                            msg.reply('Dice is now rigged for maximum.');
                        }
                        else {
                            msg.reply('Dice is no longer rigged.');
                            msg.guild.cache.setRigged(0);
                        }
                    }
                    else {
                        msg.reply('Dice cannot be rigged in this server.');
                    }
                    break;
                case 'low':
                    if (rigged != -1) {
                        if (rigged != 1) {
                            msg.guild.cache.setRigged(1);
                            msg.reply('Dice is now rigged for minimum.');
                        }
                        else {
                            msg.reply('Dice is no longer rigged.');
                            msg.guild.cache.setRigged(0);
                        }
                    }
                    else {
                        msg.reply('Dice cannot be rigged in this server.');
                    }
                    break;
                case 'status':
                    switch(rigged) {
                        case 1:
                            msg.reply('The dice is rigged for minimum.');
                            break;
                        case 2:
                            msg.reply('The dice is rigged for maximum.');
                            break;
                        case -1:
                            msg.reply('The dice cannot be rigged in this server.');
                            break;
                        case 0:
                            msg.reply('The dice is not rigged.');
                    }
                    break;
                case 'toggle':
                    if (msg.member.hasPermission('ADMINISTRATOR')) {
                        if (rigged == -1) {
                            msg.guild.cache.setRigged(0);
                            msg.reply('The dice can now be rigged.');
                        }
                        else {
                            msg.guild.cache.setRigged(-1);
                            msg.reply('The dice can now no longer be rigged.');
                        }
                    }
                    else {
                        msg.reply('You do not have the permission to do this action.');
                    }
                    break;
                case 'help':
                default: {
                    const prefix = msg.guild.cache.getPrefix();
                    const help = `Can be used to rig any dice rolled within this server\
                    \nTo rig a dice:\n\
                    \n${prefix}rig high    Rigs the dice to only roll the maximum value\
                    \n${prefix}rig low     Rigs the dice to only roll the minimum value\
                    \n${prefix}rig status  Shows the current rig status\
                    \nTo unrig the dice, simply repeat the same command e.g. if rigged high, retype ${prefix}rig high\n\
                    \nServer Administrators can also toggle whether the dice can be rigged or not:\n\
                    \n${prefix}rig toggle  Toggles whether the dice can be rigged`;
                    const {helpEmbed} = require('../utils/helpEmbed.js');
                    msg.channel.send(helpEmbed(help,'Rig Info'));
                }
            }
        }
        
    }
};