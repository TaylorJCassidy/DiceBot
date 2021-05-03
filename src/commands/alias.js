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
        \nThe alias name cannot include spaces and cannot be the same as any default commands.\n\
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
            
            args = args.toLowerCase();

            let split = args.search(/ |$/)
            const arguement = args.substring(0,split);
            args = args.substring(split+1);

            switch (arguement) {
                case 'add':
                    this.addAlias(msg,args);
                    break;
                case 'remove':
                    this.removeAlias(msg,args);
                    break
                case 'list':
                    this.listAliases(msg)
                    break;
                case 'help':
                    msg.channel.send(finalHelp);
                    break;
            }
        }
    },
    addAlias: function(msg,args) {
        const diceRegex = new RegExp(/^((((\d{0,3}d\d{1,5})|-?\d{1,5}) ?[\+\-\*\/] ?)*(\d{0,3}d\d{1,5})( ?[\+\-\*\/] ?\d{1,5})*( ?~(res|vul|a|d))*)$/,'i');
        let split = args.search(/(?<=^\w+) /);
        if (split < 1) {
            msg.reply(`Invalid formatting ${prefix}alias add <name> <dice>`);
        }
        else {
            const name = args.substring(0,split);
            const dice = args.substring(split+1);

            if (!diceRegex.test(dice)) {
                msg.reply('The dice provided is an invalid dice roll. Make sure you name has no spaces.');
            }
            else if (!/^(\w+)$/.test(name)){
                msg.reply('Invalid name. The name provided includes invalid characters.');
            }
            else if (msg.client.commands.has(name) || msg.guild.cache.getAliases().has(name)) {
                msg.reply('Invalid name. The name provided overrides a command or a previous alias.');
            }
            else {
                let status = msg.guild.cache.setAlias(name,dice);
                if (!status) {
                    msg.reply('There has been an error. Please try again');
                }
                else {
                    msg.reply(`Alias '${name}' has been added.`);
                }
            }
        }
    },
    removeAlias: function(msg,args) {
        const name = args;
        if (!/^(\w+)$/.test(name)){
            msg.reply('Invalid name. The name provided includes invalid characters.');
        }
        else if (msg.guild.cache.getAliases().has(name)) {
            let status = msg.guild.cache.removeAlias(name);
            if (!status) {
                msg.reply('There has been an error. Please try again');
            }
            else {
                msg.reply(`Alias '${name}' has been removed.`);
            }
        }
        else {
            msg.reply(`There is no '${name}' alias.`)
        }
    },
    listAliases: function(msg) {
        const Discord = require('discord.js');

        let msgReturn = '';
        msg.guild.cache.getAliases().forEach((value,key) => {
            msgReturn += `${key}:  ${value}\n`;
        });
        msg.channel.send(new Discord.MessageEmbed().setDescription('```' + msg.guild.name + '\'s Aliases:\t\t\n\n' + msgReturn + '```').setTitle('Alias List'));
    }
}