module.exports = {
    name: 'alias',
    run: function(msg,args) {
        args = args.toLowerCase();

        const split = args.search(/ |$/)
        const arguement = args.substring(0,split);
        args = args.substring(split+1);

        switch (arguement) {
            case 'add':
                this.addAlias(msg,args);
                break;
            case 'edit':
                this.editAlias(msg,args);
                break;
            case 'remove':
                this.deleteAlias(msg,args);
                break;    
            case 'list':
                this.listAliases(msg);
                break;      
            case 'help':
                this.help(msg);
                break;
            default:
                msg.reply(`There is no ${arguement} command ${msg.guild.cache.getPrefix()}alias help for help.`)
        }
    },

    addAlias: function(msg,args) {     
        const split = args.search(/(?<=^\w+) /);
        if (split < 1) {
            msg.reply(`Invalid formatting ${msg.guild.cache.getPrefix()}alias add <name> <dice>`);
        }
        else {
            const name = args.substring(0,split);
            const dice = args.substring(split+1);

            if (!msg.client.diceRegex.test(dice)) {
                msg.reply('The dice provided is an invalid dice roll. Please check the alias name has no spaces.');
            }
            else if (!/^(\w+)$/.test(name)){
                msg.reply('Invalid name. The name provided includes invalid characters.');
            }
            else if (msg.client.commands.has(name) || msg.guild.cache.getAliases().has(name)) {
                msg.reply('Invalid name. The name provided overrides a command or a previous alias.');
            }
            else {
                const Alias = require('./../models/Alias.js');
                let alias = new Alias(msg.guild.id,msg.author.id,name,dice)
                let status = msg.guild.cache.setAlias(alias);
                if (!status) {
                    msg.reply('There has been an error. Please try again.');
                }
                else {
                    msg.reply(`Alias '${name}' has been added.`);
                }
            }
        }
        
    },

    editAlias: function(msg,args) {
        const split = args.search(/(?<=^\w+) /);
        if (split < 1) {
            msg.reply(`Invalid formatting ${msg.guild.cache.getPrefix()}alias edit <name> <dice>`);
        }
        else {
            const name = args.substring(0,split);
            const dice = args.substring(split+1);

            if (!msg.client.diceRegex.test(dice)) {
                msg.reply('The dice provided is an invalid dice roll. Please check the alias name has no spaces.');
            }
            else if (!msg.guild.cache.getAliases().has(name)) {
                msg.reply('Invalid alias name. The alias provided does not exist.');
            }
            else {
                const alias = msg.guild.cache.getAliases().get(name);
                if (msg.author.id == alias.userID || msg.member.hasPermission('ADMINISTRATOR')) {
                    alias.dice = dice;
                    let status = msg.guild.cache.updateAlias(alias);
                    if (!status) {
                        msg.reply('There has been an error. Please try again.');
                    }
                    else {
                        msg.reply(`Alias '${name}' has been edited.`);
                    }
                }
                else {
                    msg.reply('You cannot edit an alias that was not created by you.');
                }
            }
        }
    },

    deleteAlias: function(msg,args) {
        if (!/^(\w+)$/.test(args)){
            msg.reply('Invalid name. The name provided includes invalid characters.');
        }
        else {
            const aliases = msg.guild.cache.getAliases();
            if (aliases.has(args)) {
                if (aliases.get(args).userID == msg.author.id || msg.member.hasPermission('ADMINISTRATOR')) {
                    let status = msg.guild.cache.deleteAlias(args);
                    if (!status) {
                        msg.reply('There has been an error. Please try again.');
                    }
                    else {
                        msg.reply(`Alias '${args}' has been removed.`);
                    }
                }
                else {
                    msg.reply('You cannot remove an alias that was not created by you.');
                }
            }
            else {
                msg.reply(`There is no '${args}' alias.`);
            }
        }
        
    }, 

    listAliases: function(msg) {
        let msgReturn = '';
        msg.guild.cache.getAliases().forEach((value,key) => {
            msgReturn += `${key}:  ${value.dice}\n`;
        });
        const {helpEmbed} = require('../utils/helpEmbed.js')
        msg.channel.send(helpEmbed(`Aliases in ${msg.guild.name}:\t\t\t\t\n\n${msgReturn}`,'Alias List'));
    },

    help: function(msg) {
        const prefix = msg.guild.cache.getPrefix();
        const help = `Can be used to save dice rolls for easy access later.\
        \nTo add an alias format as such:\n\
        \n${prefix}alias add <alias name> <dice>\
        \n${prefix}alias add attack1 3d6+10\
        \n${prefix}alias add chr d20-2\
        \n${prefix}alias add flank1 4d8+3 ~a\
        \nThe alias name cannot include spaces and cannot be the same as any default commands.\n\
        \nTo remove an alias format as such:\n\
        \n${prefix}alias remove <alias name>\
        \n${prefix}alias remove attack1\
        \n${prefix}alias remove chr\n\
        \nTo edit an existing alias, format as such:\n\
        \n${prefix}alias edit <alias name> <new dice>\
        \n${prefix}alias edit attack1 2d6+2\
        \n${prefix}alias edit chr d20+3 ~a\n\
        \nTo use a alias, format as such:\n\
        \n${prefix}attack1\
        \n${prefix}chr\n\
        \nYou can also add arguements to the end of aliases.e.g.\n\
        \n${prefix}attack1 ~a\
        \n${prefix}chr ~res\n\
        \nTo view a list of aliases, type ${prefix}alias list`;
        const {helpEmbed} = require('../utils/helpEmbed.js')
        msg.channel.send(helpEmbed(help,'Alias Info'));
    }
}