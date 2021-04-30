const Discord = require('discord.js'); //12.0.2
const {token} = require("./config/token.json");

const client = new Discord.Client();
const commands = require('./utils/getCommands.js').getCommands();
let guildCaches;
const diceRegex = new RegExp(/^((((\d{0,4}d\d{1,6})|-?\d{1,6}) ?[\+\-\*\/] ?)*(\d{0,4}d\d{1,6})( ?[\+\-\*\/] ?\d{1,6})*( ?~(res|vul|a|d))*)$/,'i');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    guildCaches = require('./utils/getGuildCaches.js').getGuildCaches(client.guilds);
});

client.on('message', msg => {

    if (msg.author.id != '774637611482349578') {
        msg.guild.cache = guildCaches.get(msg.guild.id);
        msg.guild.prefix = msg.guild.cache.getPrefix();
        const aliases = msg.guild.cache.getAliases();

        if (msg.content.startsWith(msg.guild.prefix)) {
            let msgcontent = msg.content.slice(msg.guild.prefix.length).trim();

            if (diceRegex.test(msgcontent)) {
                commands.get('dice').diceController(msg,msgcontent);
            }
            else {
                const args = msgcontent.split(' ');
                const command = args.shift().toLowerCase();

                if (aliases.has(command)) {
                    commands.get('alias').aliasController();
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