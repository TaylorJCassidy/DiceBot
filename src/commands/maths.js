module.exports = {
    name: 'maths',
    aliases: ['m','math'],
    run: (msg,args) => {
        let eq = args;
        if (/[^0-9%^*\/()\-+.]/g.test(eq)) {
            msg.reply('The equation only contain the following operators: () - + * / ^ %');
        }
        else {
            eq = eq.replace(/\^/g,'**')
            msg.reply(new Function('return ' + eq)())
        }
    }
}