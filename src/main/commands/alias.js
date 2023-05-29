const helpEmbed = require('../utils/helpEmbed.js');
const {aliasResponses} = require('../utils/commonReplies.json');

module.exports = {
    name: 'alias',
    run: (msg, args) => {
        args = args.toLowerCase();

        const split = args.search(/ |$/);
        const arguement = args.substring(0, split);
        args = args.substring(split+1);

        switch (arguement) {
            case 'add':
                return addAlias(msg, args);
            case 'edit':
                return editAlias(msg, args);
            case 'remove':
                return deleteAlias(msg, args);
            case 'list':
                return listAliases(msg);
            case '':
            case 'help':
                return help(msg);
            default:
                return `There is no ${arguement} command ${msg.guild.cache.getPrefix()}alias help for help.`;
        }
    }
};

const addAlias = (msg, args) => {     
    const split = args.search(/(?<=^\w+) /); 
    if (split < 1) return `Invalid formatting ${msg.guild.cache.getPrefix()}alias add <name> <dice>`;

    const aliasName = args.substring(0, split);
    const dice = args.substring(split + 1);
    let reply;

    if (!msg.client.diceRegex.test(dice)) {
        reply = aliasResponses.regexError;
    }
    else if (msg.client.commands.has(aliasName) || msg.guild.cache.getAliases().has(aliasName)) {
        reply = 'Invalid name. The name provided overrides a command or a previous alias.';
    }
    else {        
        const alias = {
            guildID: msg.guild.id,
            userID: msg.author.id,
            aliasName,
            dice
        };
        const status = msg.guild.cache.setAlias(alias);
        if (status) {
            reply = `Alias '${aliasName}' has been added.`;
        }
        else {
            reply = aliasResponses.dbError;
        }
    }
    return reply;
};

const editAlias = (msg, args) => {
    const split = args.search(/(?<=^\w+) /);
    if (split < 1) return `Invalid formatting ${msg.guild.cache.getPrefix()}alias edit <name> <dice>`;

    const name = args.substring(0, split);
    const dice = args.substring(split+1);
    let reply;

    if (!msg.client.diceRegex.test(dice)) {
        reply = aliasResponses.regexError;
    }
    else if (!msg.guild.cache.getAliases().has(name)) {
        reply = 'Invalid alias name. The alias provided does not exist.';
    }
    else {
        const alias = msg.guild.cache.getAliases().get(name);
        if (msg.author.id == alias.userID || msg.member.permissions.has('ADMINISTRATOR')) {
            alias.dice = dice;
            const status = msg.guild.cache.updateAlias(alias);
            if (status) {
                reply = `Alias '${name}' has been edited.`;
            }
            else {
                reply = aliasResponses.dbError;
            }
        }
        else {
            reply = aliasResponses.userNotAuth;
        }
    }
    return reply;
};

const deleteAlias = (msg, args) => {
    if (!/^(\w+)$/.test(args)) return 'Invalid name. The name provided includes invalid characters.';

    const aliases = msg.guild.cache.getAliases();
    let reply;

    if (aliases.has(args)) {
        if (aliases.get(args).userID == msg.author.id || msg.member.permissions.has('ADMINISTRATOR')) {
            const status = msg.guild.cache.deleteAlias(args);
            if (status) {
                reply = `Alias '${args}' has been removed.`;
            }
            else {
                reply = aliasResponses.dbError;
            }
        }
        else {
            reply = aliasResponses.userNotAuth;
        }
    }
    else {
        reply = `There is no '${args}' alias.`;
    }
    return reply;
};

const listAliases = (msg) => {
    const aliasesMap = msg.guild.cache.getAliases();
    if (aliasesMap.size == 0) return 'This server has no aliases.';

    const aliases = Array.from(aliasesMap.values());
    let aliasList = '';

    aliases.sort((a, b) => a.aliasName > b.aliasName ? 1 : -1);

    let biggest = aliases[0].aliasName.length;
    for (let i = 1; i < aliases.length; i++) {
        if (aliases[i].aliasName.length > biggest) {
            biggest = aliases[i].aliasName.length;
        }
    }

    aliases.forEach((alias) => {
        aliasList += `${alias.aliasName}:${' '.repeat(biggest-alias.aliasName.length)}  ${alias.dice}\n`;
    });
    
    return helpEmbed(`Aliases in ${msg.guild.name}:\t\t\t\t\n\n${aliasList}`, 'Alias List');
};

const help = (msg) => {
    const prefix = msg.guild.cache.getPrefix();
    const help = 
        'Can be used to save dice rolls for easy access later.\n\n' +
        'To add an alias format as such:\n' +
        `${prefix}alias add <alias name> <dice>\n` +
        `${prefix}alias add attack1 3d6+10\n` +
        `${prefix}alias add chr d20-2\n` +
        `${prefix}alias add flank1 4d8+3 ~a\n` +
        'The alias name cannot include spaces and cannot be the same as any default commands.\n\n' +
        'To remove an alias format as such:\n' +
        `${prefix}alias remove <alias name>\n` +
        `${prefix}alias remove attack1\n` +
        `${prefix}alias remove chr\n\n` +
        'To edit an existing alias, format as such:\n' +
        `${prefix}alias edit <alias name> <new dice>\n` +
        `${prefix}alias edit attack1 2d6+2\n` +
        `${prefix}alias edit chr d20+3 ~a\n\n` +
        'To use a alias, format as such:\n' +
        `${prefix}attack1\n` + 
        `${prefix}chr\n\n` +
        'You can also add arguements to the end of aliases.e.g.\n' +
        `${prefix}attack1 ~a\n` +
        `${prefix}chr ~res\n\n` +
        `To view a list of aliases, type ${prefix}alias list`;

    return helpEmbed(help, 'Alias Info');
};