module.exports = {
    name: 'help',
    run: (msg,args) => {
        const Discord = require('discord.js');
        const prefix = msg.guild.cache.getPrefix();

        const help = 
         `${prefix}ping          Checks if the bot is still active\
        \n${prefix}uptime        Shows uptime of the bot\
        \n${prefix}maths         Evaluate a maths expression\
        \n${prefix}d20           Rolls any dice .dice for info\
        \n${prefix}alias add     Adds an alias .alias for info\
        \n${prefix}alias remove  Removes an alias .alias for info\
        \n${prefix}rig high      Rigs the dice to roll the maximum value\
        \n${prefix}rig low       Rigs the dice to roll the minimum value\
        \n${prefix}rig status    Shows if dice is rigged or not\
        \n${prefix}rig toggle    Toggles whether users can rig\
        \n${prefix}stats         Shows random dnd stats\
        \n${prefix}getmod        Shows ability modifier of a number\
        \n${prefix}changeprefix  Changes prefix. Currently '${prefix}'`
        const finalHelp = new Discord.MessageEmbed().setDescription('```' + help + '```').setTitle('Help');
        msg.channel.send(finalHelp);
    }
}