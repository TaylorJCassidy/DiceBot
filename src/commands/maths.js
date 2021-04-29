module.exports = {
    name: 'maths',
    aliases: ['m','math'],
    run: (msg,args) => {
        let eq = '';
        for (arg of args) {
            eq += arg;
        }
        eq = eq.replace(/[^0-9%^*\/()\-+.]/g,'')
        eq = eq.replace(/\^/g,'**')
        msg.reply(new Function('return ' + eq)())
    }
}