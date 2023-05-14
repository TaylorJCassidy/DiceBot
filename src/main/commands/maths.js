const cleanRegex = /[^0-9%^*/()\-+.]/g;

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
    calc: function(equation) {
        let toReturn;
        if (cleanRegex.test(equation)) return 'Invalid';
        
        try {
            toReturn = new Function('return ' + equation)().toString();
        }
        catch(e) {
            return 'Invalid';
        }
        
        if (/[^0-9.]/g.test(toReturn)) return 'Invalid';
        return toReturn;
    }
};