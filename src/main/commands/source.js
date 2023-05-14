const {iconProvider} = require('../app.json').theme;

module.exports = {
    name: 'source',
    aliases: ['sourcecode', 'github'],
    run: (msg) => {
        msg.reply('All of DiceBot\'s source code can be found here: https://github.com/TaylorJCassidy/DiceBot. Icon is provided by ' + iconProvider);
    }
};