const Discord = require('discord.js'); //12.0.2
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    
});

client.login(require("./config/token.json").token);