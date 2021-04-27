const Discord = require('discord.js'); //12.0.2
const {token} = require("./config/token.json");

const client = new Discord.Client();
const commands = require('./utils/getCommands.js').getCommands();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let args;
    commands.get(msg.content).run(msg,args);
});

client.login(token);