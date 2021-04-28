module.exports = {
    name: 'maths',
    run: (msg,args) => {
        let eq = '';
        for (arg of args) {
            eq += arg;
        }
        msg.reply(new Function('return ' + eq)())
    }
}