module.exports = {
    name: 'stats',
    run: function(msg,args) {
        const {randomNoGen} = require('../utils/randomNoGen.js');

        let msgReturn = '\n>>> ';
        let total = 0;
        const getMod = msg.client.commands.get('getmod').getMod;

        for (let i=0;i<6;i++) {
            let results = randomNoGen(6,1);
            let smallest = results;

            for (let j=0;j<3;j++) {
                let result = randomNoGen(6,1);
                if (result < smallest) {
                    smallest = result;
                }
                results += result;
            }
            results -= smallest;
            total +=results;
            
            msgReturn += `${results}${(results < 10 ? '  ' : ' ')}${getMod(results)}\n`;
        }
        msg.reply(msgReturn + 'Total: ' + total);
    }
};