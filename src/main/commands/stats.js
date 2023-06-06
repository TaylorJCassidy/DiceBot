const randomNoGen = require('../utils/randomNoGen.js');
const getMod = require('./common/getmod');

module.exports = {
    name: 'stats',
    run: () => {
        let msgReturn = '>>> ```';
        let total = 0;

        for (let i=0; i<6; i++) {
            let results = randomNoGen(6, 1);
            let smallest = results;

            for (let j=0; j<3; j++) {
                const result = randomNoGen(6, 1);
                if (result < smallest) {
                    smallest = result;
                }
                results += result;
            }
            results -= smallest;
            total += results;
            
            msgReturn += `${results}${(results < 10 ? '  ' : ' ')}${getMod(results)}\n`;
        }
        return msgReturn + '```Total: ' + total;
    }
};