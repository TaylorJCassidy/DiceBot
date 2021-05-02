const Discord = require('discord.js'); //12.0.2
const {token} = require("./config/token.json");

const client = new Discord.Client();
const commands = require('./utils/getCommands.js').getCommands();
client.commands = commands;
const diceRegex = new RegExp(/^((((\d{0,3}d\d{1,5})|-?\d{1,5}) ?[\+\-\*\/] ?)*(\d{0,3}d\d{1,5})( ?[\+\-\*\/] ?\d{1,5})*( ?~(res|vul|a|d))*)$/,'i');
let guildCaches;

client.on('ready', () => {
    guildCaches = require('./utils/getGuildCaches.js').getGuildCaches(client.guilds);
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if (msg.author.id != '774637611482349578' && msg.channel.type == 'text') {
        const cache = guildCaches.get(msg.guild.id);
        const prefix = cache.getPrefix();
        msg.guild.cache = cache;

        if (msg.content.startsWith(prefix)) {
            let msgcontent = msg.content.slice(prefix.length);

            if (diceRegex.test(msgcontent)) {
                commands.get('dice').diceController(msg,msgcontent);
            }
            else {
                let split = msgcontent.search(/ |$/);
                const aliases = cache.getAliases();
                const command = msgcontent.substring(0,split).toLowerCase();
                const args = msgcontent.substring(split+1).trim();

                if (aliases.has(command)) {
                    commands.get('dice').diceController(msg,aliases.get(command));
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