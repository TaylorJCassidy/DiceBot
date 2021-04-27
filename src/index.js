const Discord = require('discord.js'); //12.0.2
const {token} = require("./config/token.json");

const client = new Discord.Client();
const commands = require('./utils/getCommands.js').getCommands();
let guildRepos;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    guildRepos = require('./utils/getGuildRepos.js').getGuildRepos(client.guilds);
});

client.on('message', msg => {

    msg.guild.repository = guildRepos.get(msg.guild.id)
    const prefix = msg.guild.repository.getPrefix();

    if (msg.author.id !== '774637611482349578' && msg.content.startsWith(prefix) === true) {
        const args = msg.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();

        if (commands.has(command)) {
            commands.get(command).run(msg,args);
        }
        else {
            msg.reply(`There is no ${command} command!`)
        }
    }

});

client.login(token);