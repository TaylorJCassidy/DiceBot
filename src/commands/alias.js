module.exports = {
    name: 'alias',
    run: function(msg,args) {
        const Discord = require('discord.js');

        const prefix = msg.guild.cache.getPrefix();
        const help = `Can be used to save dice rolls for easy access later.\
        \nTo add an alias format as such:\n\
        \n${prefix}alias add <name> <dice>\
        \n${prefix}alias add attack1 3d6+10\
        \n${prefix}alias add chr d20-2\
        \n${prefix}alias add flank1 4d8+3 ~a\
        \nNo spaces should be used within the alias name\n\
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
            const diceRegex = new RegExp(/^((((\d{0,3}d\d{1,5})|-?\d{1,5}) ?[\+\-\*\/] ?)*(\d{0,3}d\d{1,5})( ?[\+\-\*\/] ?\d{1,5})*( ?~(res|vul|a|d))*)$/,'i');
            args = args.toLowerCase();

            let split = args.search(/ |$/)
            const arguement = args.substring(0,split);
            args = args.substring(split+1);

            switch (arguement) {
                case 'add':
                    split = args.search(/(?<=^\w+) /);
                    if (split < 1) {
                        msg.reply(`Invalid formatting, ${prefix}alias add <name> <dice>`)
                    }
                    else {
                        const name = args.substring(0,split);
                        const dice = args.substring(split+1);

                        if (!diceRegex.test(dice)) {
                            msg.reply('The dice provided is an invalid dice roll. Make sure you name has no spaces.');
                        }
                        else if (!/^(\w+)$/.test(name)){
                            msg.reply('The name provided includes invalid characters.')
                        }
                        else {
                            let status = msg.guild.cache.setAlias(name,dice);
                            if (!status) {
                                msg.reply('There has been an error. Please try again');
                            }
                            else {
                                msg.reply(`Success! Alias '${name}' added.`);
                            }
                        }
                    }
                    
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