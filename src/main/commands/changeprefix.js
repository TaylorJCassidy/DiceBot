module.exports = {
    name: 'changeprefix',
    run: (msg, args) => {

        if (msg.member.permissions.has('ADMINISTRATOR')) {
            if (args.length == 0) {
                msg.reply(`Please supply a prefix e.g. ${msg.guild.cache.getPrefix()}changeprefix /`);
            }
            else if (!/^([^~\\']{1,2})$/.test(args)) {
                msg.reply('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');
            }
            else if (msg.guild.cache.getPrefix() == args) {
                msg.reply(`Prefix is already '${args}'.`);
            }
            else {
                const status = msg.guild.cache.setPrefix(args);
                if (status == false) {
                    msg.reply('There has been an error. Please try again.');
                }
                else {
                    msg.reply(`The prefix has been changed to '${msg.guild.cache.getPrefix()}'.`);
                }
            }
        }
        else {
            msg.reply('You do not have the permission to do this action.');
        }
    }
};