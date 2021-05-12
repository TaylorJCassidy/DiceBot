const Discord = require('discord.js'); //12.5.3
const Repository = require('./repository/Repository');
const GuildCache = require('./caches/GuildCache');
const {token} = require("./config/token.json");
const client = new Discord.Client();
const commands = require('./utils/getCommands.js').getCommands();
client.commands = commands;
let guildCaches;

client.on('ready', () => {
    guildCaches = require('./utils/getGuildCaches.js').getGuildCaches(client.guilds);
    client.diceRegex = new RegExp(/^((((\d{0,3}d\d{1,5})|-?\d{1,5}) ?[\+\-\*\/] ?)*(\d{0,3}d\d{1,5})( ?[\+\-\*\/] ?\d{1,5})*( ?~(res|vul|a|d))*)$/,'i');
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildDelete', (guild) => {
    const repo = new Repository(guild.id);
    repo.deleteGuild();
    guildCaches.delete(guild.id);
});

client.on('guildCreate', (guild) => {  
    guildCaches.set(guild.id,(new GuildCache(guild.id)))
});

client.on('message', msg => {

    if (msg.author.id != client.user.id && msg.channel.type == 'text') {
        const cache = guildCaches.get(msg.guild.id);
        const prefix = cache.getPrefix();
        msg.guild.cache = cache;

        if (msg.content.startsWith(prefix)) {
            let msgcontent = msg.content.slice(prefix.length);

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
                    msg.reply(`There is no ${command} command!`);
                }
            }
        }
    }

});

client.login(token);