const calc = require('./common/calc');

module.exports = {
    name: 'maths',
    aliases: ['m', 'math'],
    run: (msg, args, {guildInfo}) => {
        let reply;
        if (args.length == 0) {
            reply = `Please supply an equation e.g. ${guildInfo.getPrefix()}maths 2+2`;
        }
        else if (/[^0-9%^*/()\-+. ]/g.test(args)) {
            reply = 'The equation can only contain the following operators: () - + * / ^ %';
        }
        else {
            args = args.replace(/\^/g, '**');
            reply = calc(args);
        }
        return reply;
    }
};