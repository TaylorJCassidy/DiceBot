const Discord = require('discord.js'); //12.5.3
const Repository = require('./repository/Repository');
const GuildCache = require('./caches/GuildCache');
const {token} = require("./config/token.json");
const client = new Discord.Client();
const commands = require('./utils/getCommands.js').getCommands();
client.commands = commands;
let guildCaches;

client.once('ready', () => {
    guildCaches = require('./utils/getGuildCaches.js').getGuildCaches(client.guilds);
    client.diceRegex = new RegExp(/^((((\d{0,2}d\d{1,3})|-?\d{1,3}) *[\+\-\*\/] *)*(\d{0,2}d\d{1,3})( *[\+\-\*\/] *\d{1,3})*( *~ *(res|vul|a|d))*)$/,'i');
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`for dice in ${guildCaches.size} servers`, { type: 'WATCHING' })
});

client.on('guildDelete', (guild) => {
    guildCaches.get(guild.id).deleteGuild();
    guildCaches.delete(guild.id);
});

client.on('guildCreate', (guild) => {  
    guildCaches.set(guild.id,(new GuildCache(guild.id)))
});

client.on('message', msg => {

    if (msg.author.id != client.user.id && msg.channel.type == 'text') {
        const cache = guildCaches.get(msg.guild.id);
        const prefix = cache.getPrefix();
        
        if (msg.content.startsWith(prefix)) {
            let msgcontent = msg.content.slice(prefix.length);
            msg.guild.cache = cache;

            if (client.diceRegex.test(msgcontent)) {
                commands.get('dice').diceController(msg,msgcontent);
            }
            else {
                let split = msgcontent.search(/ |$/);
                const aliases = cache.getAliases();
                const command = msgcontent.substring(0,split).toLowerCase();
                const args = msgcontent.substring(split+1).trim();

                if (aliases.has(command)) {
                    commands.get('dice').diceController(msg,aliases.get(command).dice+args);
                }
                else if (commands.has(command)) {
                    commands.get(command).run(msg,args);
                }
                else {
                    msg.reply(`There is no ${command} command! ${prefix}help for help`);
                }
            }
        }
    }

});

client.login(token);