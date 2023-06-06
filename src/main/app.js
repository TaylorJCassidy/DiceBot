const commands = require('./utils/getCommands.js');
const getGuildCaches = require('./utils/getGuildCaches.js');
const GuildCache = require('./caches/GuildCache.js');
const logger = require('./utils/logger.js');
const {ChannelType} = require('discord.js');
const {diceRegex} = require('./commands/common/extras.js');

let guilds;

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

        guilds = getGuildCaches(client.guilds);
    });

    client.on('guildDelete', (guild) => {
        guilds.get(guild.id).deleteGuild();
        guilds.delete(guild.id);
    });
    
    client.on('guildCreate', (guild) => {  
        guilds.set(guild.id, new GuildCache(guild.id));
    });
    
    client.on('messageCreate', (msg) => {
        if (msg.author.id == client.user.id || msg.channel.type != ChannelType.GuildText) return;
    
        const guildInfo = guilds.get(msg.guild.id);
        const prefix = guildInfo.getPrefix();
        
        if (msg.content.startsWith(prefix)) {
            const msgcontent = msg.content.slice(prefix.length);

            if (diceRegex.test(msgcontent)) {
                commands.get('dice').diceController(msg, msgcontent);
            }
            else {
                const split = msgcontent.search(/ |$/);
                const aliases = guildInfo.getAliases();
                const command = msgcontent.substring(0, split).toLowerCase();
                const args = msgcontent.substring(split+1).trim();

                if (aliases.has(command)) {
                    commands.get('dice').diceController(msg, aliases.get(command).dice+args);
                }
                else if (commands.has(command)) {
                    const commandObject = commands.get(command);
                    const options = {
                        guildInfo,
                        commands,
                        log: logger(commandObject.name)
                    };
                    const reply = commandObject.run(msg, args, options);
                    if (reply) msg.reply(reply);
                }
                else {
                    msg.reply(`There is no ${command} command! ${prefix}help for help`);
                }
            }
        }
        else if (!msg.mentions.everyone && msg.mentions.has(client.user.id) && !msg.author.bot) {
            msg.reply(`The current prefix is '**${prefix}**'`);
        }
    });
};