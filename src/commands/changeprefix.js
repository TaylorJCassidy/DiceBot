module.exports = {
    name: 'changeprefix',
    run: function(msg,args) {

        if (args.length == 0) {
            msg.reply(`Please supply a prefix e.g. ${msg.guild.cache.getPrefix()}changeprefix /`)
        }
        else if (!/^([^~\\'])$/.test(args)) {
            msg.reply('Prefix cannot be more than one character and cannot be any of the following: ^ ~ \\ \'');
        }
        else {
            let status = msg.guild.cache.setPrefix(args);
            if (status === false) {
                msg.reply('There has been an error. Please try again.');
            }
            else {
                msg.reply(`The prefix has been changed to '${msg.guild.cache.getPrefix()}'`);
            }
        }
    }
}