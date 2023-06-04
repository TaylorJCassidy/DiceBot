const {helpEmbed} = require('./common/extras');
const getmod = require('./common/getmod.js');

module.exports = {
    name: 'getmod',
    run: (msg, args, {guildInfo}) => {
        let reply;
        if (args.length == 0) {
            const prefix = guildInfo.getPrefix();
            const help = 
                'Gets the D&D modifier of any positive whole number e.g:\n' +
                `\n${prefix}getmod <number>` + 
                `\n${prefix}getmod 10  Would return 0` +
                `\n${prefix}getmod 20  Would return +5` +
                `\n${prefix}getmod 1   Would return -5`;
            reply = helpEmbed(help, 'Getmod Info');
        }
        else if (!/^(\d{1,5})$/.test(args)) {
            reply = 'The number provided is not a positive whole number, or is too large.';
        }
        else {
            reply = getmod(args);
        }
        return reply;
    }
};