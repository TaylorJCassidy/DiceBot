module.exports = {
    name: 'changeprefix',
    run: (msg,args) => {
        const prefixRegex = new RegExp(/^([^~\\'])$/);

        if (args.length == 0) {
            msg.reply(`Please supply a prefix e.g. ${msg.guild.prefix}changeprefix /`)
        }
        else if (!prefixRegex.test(args[0])) {
            msg.reply('Prefix cannot be any of the following: ^ ~ \\ \'');
        }
        else {
            let status = msg.guild.repository.setPrefix(args[0]);
            if (status === false) {
                msg.reply('There has been an error. Please try again.');
            }
            else {
                msg.reply(`The prefix has been changed to '${args[0]}'`);
            }
        }
    }
}