const commands = require('./utils/getCommands.js');
const {ChannelType} = require('discord.js');
const {diceRegex} = require('./commands/common/extras.js');
const {setupGuildRepos, addGuild, getGuild, deleteGuildCache} = require('./repository/GuildRepoManager.js');

module.exports = (client) => {
    client.on('ready', () => {
        console.log(
            '    ____     _                  ____           __ \n' + 
            '   / __ \\   (_)  _____  ___    / __ )  ____   / /_\n' + 
            '  / / / /  / /  / ___/ / _ \\  / __  | / __ \\ / __/\n' + 
            ' / /_/ /  / /  / /__  /  __/ / /_/ / / /_/ // /_  \n' +
            '/_____/  /_/   \\___/  \\___/ /_____/  \\____/ \\__/  \n'
        );
        console.log(`Logged in as ${client.user.tag} at ${new Date().toISOString()}`);

        setupGuildRepos(client.guilds);
    });

    client.on('guildDelete', (guild) => {
        deleteGuildCache(guild.id);
    });
    
    client.on('guildCreate', (guild) => {  
        addGuild(guild.id);
    });
    
    client.on('messageCreate', (msg) => {
        if (msg.author.id == client.user.id || msg.channel.type != ChannelType.GuildText) return;
    
        const guildInfo = getGuild(msg.guild.id);
        const prefix = guildInfo.getPrefix();
        
        if (msg.content.startsWith(prefix)) {
            const options = {
                guildInfo,
                commands
            };
            callCommand(msg, msg.content.slice(prefix.length), options, prefix);
        }
        else if (!msg.mentions.everyone && msg.mentions.has(client.user.id) && !msg.author.bot) {
            msg.reply(`The current prefix is '**${prefix}**'`);
        }
    });
};

const callCommand = (msg, commandString, options, prefix) => {
    if (diceRegex.test(commandString)) {
        msg.reply(commands.get('dice').diceController(msg, commandString, options));
    }
    else {
        const split = commandString.search(/ |$/);
        const command = commandString.substring(0, split).toLowerCase();
        const args = commandString.substring(split+1).trim();
        const aliases = options.guildInfo.getAliases();

        if (aliases.has(command)) {
            msg.reply(commands.get('dice').diceController(msg, aliases.get(command).dice+args));
        }
        else if (commands.has(command)) {
            const commandObject = commands.get(command);
            const reply = commandObject.run(msg, args, options);
            if (reply) msg.reply(reply);
        }
        else {
            msg.reply(`There is no ${command} command! ${prefix}help for help`);
        }
    }
};