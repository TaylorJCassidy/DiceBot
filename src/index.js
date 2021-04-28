const Discord = require('discord.js'); //12.0.2
const {token} = require("./config/token.json");

const client = new Discord.Client();
const commands = require('./utils/getCommands.js').getCommands();
let guildRepos;
const diceRegex = new RegExp(/^((((\d{0,4}d\d{1,6})|-?\d{1,6})[\+\-\*\/])*(\d{0,4}d\d{1,6})([\+\-\*\/]\d{1,6})*)$/,'i');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    guildRepos = require('./utils/getGuildRepos.js').getGuildRepos(client.guilds);
});

client.on('message', msg => {

    msg.guild.repository = guildRepos.get(msg.guild.id);
    msg.guild.prefix = msg.guild.repository.getPrefix();

    if (msg.author.id !== '774637611482349578' && msg.content.startsWith(msg.guild.prefix)) {
        msgcontent = msg.content.slice(msg.guild.prefix.length).trim();

        let dicecontent = msgcontent.replace(/ /g,'');
        if (diceRegex.test(dicecontent)) {
            commands.get('dice').roll(msg,dicecontent);
        }
        else {
            const args = msgcontent.split(' ');
            const command = args.shift().toLowerCase();

            if (commands.has(command)) {
                commands.get(command).run(msg,args);
            }
            else {
                msg.reply(`There is no ${command} command!`);
            }
        }
    }

});

client.login(token);