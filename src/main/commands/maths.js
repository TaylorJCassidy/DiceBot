const cleanRegex = /[^0-9%^*/()\-+. ]/g;

module.exports = {
    name: 'maths',
    aliases: ['m', 'math'],
    run: function(msg, args) {
        if (args.length == 0) {
            msg.reply(`Please supply an equation e.g. ${msg.guild.cache.getPrefix()}maths 2+2`);
        }
        else if (cleanRegex.test(args)) {
            msg.reply('The equation can only contain the following operators: () - + * / ^ %');
        }
        else {
            args = args.replace(/\^/g, '**');
            msg.reply(this.calc(args));
        }
    },
    calc: (equation) => {
        let result;
        if (cleanRegex.test(equation)) return 'Invalid equation';
        
        try {
            result = new Function('return ' + equation)().toString();
        }
        catch(e) {
            return 'Invalid equation';
        }
        
        if (/[^0-9.]/g.test(result)) return 'Invalid return values';
        return result;
    }
};