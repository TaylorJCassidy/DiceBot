const commonReplies = require('../configs/commonReplies.json');

module.exports = {
    name: 'changeprefix',
    run: (msg, args, {guildInfo}) => {   
        if (!msg.member.permissions.has('ADMINISTRATOR')) return commonReplies.common.userNotAuth;

        let reply;
        const currentPrefix = guildInfo.getPrefix();

        if (args.length == 0) {
            reply = `Please supply a prefix e.g. ${currentPrefix}changeprefix /`;
        }
        else if (!/^([^^~\\']{1,2})$/.test(args)) {
            reply = 'Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'';
        }
        else if (currentPrefix == args) {
            reply = `Prefix is already '${args}'.`;
        }
        else {
            const status = guildInfo.setPrefix(args);
            if (status) {
                reply = `The prefix has been changed to '${currentPrefix}'.`;
            }
            else {
                reply = commonReplies.common.error;
            }
        }

        return reply;
    }
};