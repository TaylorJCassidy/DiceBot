const {helpEmbed} = require('./common/extras');
const rigStatus = require('./common/rigStatus.json');

module.exports = {
    name: 'rig',
    run: (msg, args, {guildInfo}) => {
        args = args.split(' ');
        if (args.length == 1) {
            switch(args[0]) {
                case 'toggle':
                    return toggle(msg, guildInfo);
                case 'help': 
                    return help(guildInfo);
            }

            if (guildInfo.getRigged() == rigStatus.DISABLED) {
                return 'Dice cannot be rigged in this server.';
            }
            else {
                switch(args[0]) {
                    case 'high':
                    case 'low':
                        return toggleHighLow(args[0], guildInfo);
                    case 'status':
                        return status(guildInfo);
                    default: 
                        return `Invalid format ${guildInfo.getPrefix()}rig high/low/status/toggle`;
                }
            }
        }
        else {
            return `Invalid format ${guildInfo.getPrefix()}rig high/low/status/toggle`;
        }       
    }
};

const toggle = (msg, guildInfo) => {
    let reply;
    if (msg.member.permissions.has('ADMINISTRATOR')) {
        if (guildInfo.getRigged() == rigStatus.DISABLED) {
            guildInfo.setRigged(rigStatus.NONE);
            reply = 'The dice can now be rigged.';
        }
        else {
            guildInfo.setRigged(rigStatus.DISABLED);
            reply = 'The dice can now no longer be rigged.';
        }
    }
    else {
        reply = 'You do not have the permission to do this action.';
    }
    return reply;
};

const help = (guildInfo) => {
    const prefix = guildInfo.getPrefix();
    const help = `Can be used to rig any dice rolled within this server\
    \nTo rig a dice:\n\
    \n${prefix}rig high    Rigs the dice to only roll the maximum value\
    \n${prefix}rig low     Rigs the dice to only roll the minimum value\
    \n${prefix}rig status  Shows the current rig status\
    \nTo unrig the dice, simply repeat the same command e.g. if rigged high, retype ${prefix}rig high\n\
    \nServer Administrators can also toggle whether the dice can be rigged or not:\n\
    \n${prefix}rig toggle  Toggles whether the dice can be rigged`;
    
    return helpEmbed(help, 'Rig Info');
};

const toggleHighLow = (type, guildInfo) => {
    let reply;
    const upperType = type.toUpperCase();
    if (guildInfo.getRigged() == rigStatus[upperType]) {
        guildInfo.setRigged(rigStatus.NONE);
        reply = 'Dice is no longer rigged.';
    }
    else {
        guildInfo.setRigged(rigStatus[upperType]);
        reply = `Dice is now rigged ${type}.`;
    }
    
    return reply;
};

const status = (guildInfo) => {
    let status;
    switch(guildInfo.getRigged()) {
        case rigStatus.HIGH:
            status = 'rigged high.';
            break;
        case rigStatus.LOW:
            status = 'rigged low.';
            break;
        case rigStatus.NONE:
            status = 'not rigged.';
            break;
    }
    return `The dice is ${status}`;
};