module.exports = {
    name: 'maths',
    aliases: ['m','math'],
    run: function(msg,args) {
        if (args.length == 0) {
            msg.reply(`Please supply an equation e.g. ${msg.guild.cache.getPrefix()}maths 2+2`);
        }
        else if (/[^0-9%^*\/()\-+.]/g.test(args)) {
            msg.reply('The equation only contain the following operators: () - + * / ^ %');
        }
        else {
            args = args.replace(/\^/g,'**')
            msg.reply(new Function('return ' + args)())
        }
    }
}