const randomNoGen = require('../utils/randomNoGen.js');
const {getMod} = require('./getmod');

module.exports = {
    name: 'stats',
    run: function(msg,args) {
        let msgReturn = '\n>>> ';
        let total = 0;

        for (let i=0; i<6; i++) {
            let results = randomNoGen(6,1);
            let smallest = results;

            for (let j=0; j<3; j++) {
                let result = randomNoGen(6,1);
                if (result < smallest) {
                    smallest = result;
                }
                results += result;
            }
            results -= smallest;
            total += results;
            
            msgReturn += `${results}${(results < 10 ? '  ' : ' ')}${getMod(results)}\n`;
        }
        msg.reply(msgReturn + 'Total: ' + total);
    }
};