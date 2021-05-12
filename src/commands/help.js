module.exports = {
    name: 'help',
    run: function(msg,args) {
        const prefix = msg.guild.cache.getPrefix();
        const help = 
         `${prefix}ping          Gets a pong response from the bot\
        \n${prefix}uptime        Shows uptime of the bot\
        \n${prefix}maths         Evaluate a maths expression\
        \n${prefix}d20           Rolls any dice ${prefix}dice for info\
        \n${prefix}alias add     Adds an alias ${prefix}alias for info\
        \n${prefix}alias edit    Edits an alias ${prefix}alias for info\
        \n${prefix}alias remove  Removes an alias ${prefix}alias for info\
        \n${prefix}alias list    Lists all aliases in this server\
        \n${prefix}rig high      Rigs the dice to roll the maximum value\
        \n${prefix}rig low       Rigs the dice to roll the minimum value\
        \n${prefix}rig status    Shows if dice is rigged or not\
        \n${prefix}rig toggle    Toggles whether users can rig\
        \n${prefix}stats         Shows random dnd stats\
        \n${prefix}getmod        Shows ability modifier of a number\
        \n${prefix}changeprefix  Changes prefix. Currently '${prefix}'`
        const {helpEmbed} = require('../utils/helpEmbed.js')
        msg.channel.send(helpEmbed(help,'Help'));
    }
}