module.exports = {
    name: 'alias',
    run: function(msg,args) {
        const Discord = require('discord.js');

        const prefix = msg.guild.cache.getPrefix();
        const help = `Can be used to save dice rolls for easy access later.\
        \nTo add an alias format as such:\n\
        \n${prefix}alias add <alias name> <dice>\
        \n${prefix}alias add attack1 3d6+10\
        \n${prefix}alias add chr d20-2\
        \n${prefix}alias add flank1 4d8+3 ~a\n\
        \nTo remove an alias format as such:\n\
        \n${prefix}alias remove <alias name>\
        \n${prefix}alias remove attack1\
        \n${prefix}alias remove chr\n\
        \nTo use a alias, format as such:\n\
        \n${prefix}attack1\
        \n${prefix}chr\n\
        \nYou can also add arguements to the end of aliases.e.g.\n\
        \n${prefix}attack1 ~a\
        \n${prefix}chr ~res\n\
        \nTo view a list of aliases, type ${prefix}alias list`;
        const finalHelp = new Discord.MessageEmbed().setDescription('```' + help + '```').setTitle('Alias Info');

        if (args.length == 0) {
            msg.channel.send(finalHelp);
        }
        else {
            let arguements = args.split(' ');
            switch (arguements[0]) {
                case 'add':
                    
                    break;
                case 'remove':

                    break
                case 'list':

                    break;
                case 'help':
                    msg.channel.send(finalHelp);
                    break;
            }
        }
    },
    aliasController: function() {

    }
}