const helpEmbed = require('../utils/helpEmbed.js');
const rigStatus = require('../utils/rigStatus.json');

module.exports = {
    name: 'rig',
    run: function(msg, args) {
        args = args.split(' ');
        if (args.length == 1) {
            const rigged = msg.guild.cache.getRigged();
            switch(args[0]) {
                case 'toggle':
                    toggle(msg, rigged);
                    return;
                case 'help': 
                    help(msg);
                    return;
            }

            if (rigged == rigStatus.DISABLED) {
                msg.reply('Dice cannot be rigged in this server.');
            }
            else {
                switch(args[0]) {
                    case 'high':
                        high(msg, rigged);
                        break;
                    case 'low':
                        low(msg, rigged);
                        break;
                    case 'status':
                        status(msg, rigged);
                        break;
                    default: 
                        msg.reply(`Invalid format ${msg.guild.cache.getPrefix()}rig high/low/status/toggle`);
                }
            }
        }
        else {
            msg.reply(`Invalid format ${msg.guild.cache.getPrefix()}rig high/low/status/toggle`);
        }       
    }
};

function toggle(msg, rigged) {
    if (msg.member.permissions.has('ADMINISTRATOR')) {
        if (rigged == rigStatus.DISABLED) {
            msg.guild.cache.setRigged(rigStatus.NONE);
            msg.reply('The dice can now be rigged.');
        }
        else {
            msg.guild.cache.setRigged(rigStatus.DISABLED);
            msg.reply('The dice can now no longer be rigged.');
        }
    }
    else {
        msg.reply('You do not have the permission to do this action.');
    }
}

function help(msg) {
    const prefix = msg.guild.cache.getPrefix();
    const help = `Can be used to rig any dice rolled within this server\
    \nTo rig a dice:\n\
    \n${prefix}rig high    Rigs the dice to only roll the maximum value\
    \n${prefix}rig low     Rigs the dice to only roll the minimum value\
    \n${prefix}rig status  Shows the current rig status\
    \nTo unrig the dice, simply repeat the same command e.g. if rigged high, retype ${prefix}rig high\n\
    \nServer Administrators can also toggle whether the dice can be rigged or not:\n\
    \n${prefix}rig toggle  Toggles whether the dice can be rigged`;
    
    msg.channel.send(helpEmbed(help, 'Rig Info'));
}

function high(msg, rigged) {
    if (rigged != rigStatus.HIGH) {
        msg.guild.cache.setRigged(rigStatus.HIGH);
        msg.reply('Dice is now rigged for maximum.');
    }
    else {
        msg.reply('Dice is no longer rigged.');
        msg.guild.cache.setRigged(rigStatus.NONE);
    }
}

function low(msg, rigged) {
    if (rigged != rigStatus.LOW) {
        msg.guild.cache.setRigged(rigStatus.LOW);
        msg.reply('Dice is now rigged for minimum.');
    }
    else {
        msg.reply('Dice is no longer rigged.');
        msg.guild.cache.setRigged(rigStatus.NONE);
    }
}

function status(msg, rigged) {
    let status;
    switch(rigged) {
        case rigStatus.HIGH:
            status = 'rigged for maximum.';
            break;
        case rigStatus.LOW:
            status = 'rigged for minimum.';
            break;
        case rigStatus.NONE:
            status = 'not rigged.';
            break;
    }
    msg.reply(`The dice is ${status}`);
}