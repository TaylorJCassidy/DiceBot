const {iconProvider} = require('../../config/app.json').theme;

module.exports = {
    name: 'source',
    aliases: ['sourcecode','github'],
    run: function(msg,args) {
        msg.reply('All of DiceBot\'s source code can be found here: https://github.com/TaylorJCassidy/DiceBot. Icon is provided by ' + iconProvider);
    }
};