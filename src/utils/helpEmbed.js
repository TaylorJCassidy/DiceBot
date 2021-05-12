module.exports = {
    helpEmbed: (content,title) => {
        const Discord = require('discord.js');
        return new Discord.MessageEmbed().setDescription('```' + content + '```').setTitle(title).setFooter('https://github.com/TaylorJCassidy/DiceBot');
    }
}