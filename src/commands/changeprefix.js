module.exports = {
    name: 'changeprefix',
    run: (msg,args) => {
        let status = msg.guild.repository.setPrefix(args[0]);
        if (status === false) {
            msg.reply('There has been an error. Please try again.');
        }
        else {
            msg.reply(`The prefix has been changed to \"${args[0]}\"`);
        }
    }
}