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
    if (guildRepos.get(msg.guild.id).getPrefix() == msg.content.charAt(0)) {
        command = msg.content.slice(1);

        let args;
        commands.get(command).run(msg,args);
    }

});

client.login(token);