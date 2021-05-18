module.exports = {
    name: 'help',
    run: function(msg,args) {
        const prefix = msg.guild.cache.getPrefix();
        const help = 
         `${prefix}alias add     Adds an alias ${prefix}alias for info\
        \n${prefix}alias edit    Edits an alias ${prefix}alias for info\
        \n${prefix}alias list    Lists all aliases in this server\
        \n${prefix}alias remove  Removes an alias ${prefix}alias for info\
        \n${prefix}changeprefix  Changes prefix. Currently '${prefix}
        \n${prefix}d20           Rolls any dice ${prefix}dice for info\
        \n${prefix}getmod        Shows ability modifier of a number\
        \n${prefix}maths         Evaluate a maths expression\  
        \n${prefix}ping          Gets the bots response times\      
        \n${prefix}rig high      Rigs the dice to roll the maximum value\
        \n${prefix}rig low       Rigs the dice to roll the minimum value\
        \n${prefix}rig status    Shows if dice is rigged or not\
        \n${prefix}rig toggle    Toggles whether users can rig .rig for info\
        \n${prefix}stats         Shows random dnd stats\
        \n${prefix}uptime        Shows the bots uptime\'`
        const {helpEmbed} = require('../utils/helpEmbed.js')
        msg.channel.send(helpEmbed(help,'Help'));
    }
}