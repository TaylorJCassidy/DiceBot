const {helpEmbed} = require('./common/extras');
const randomNoGen = require('../utils/randomNoGen');
const calc = require('./common/calc');
const rigStatus = require('./common/rigStatus.json');

module.exports = {
    name: 'dice',
    run: (msg, args, {guildInfo}) => {
        return help(guildInfo);
    },

    diceController: (msg, diceString, {guildInfo}) => {
        diceString = diceString.toLowerCase();
        // eslint-disable-next-line no-useless-escape
        if (/^(d[01] *([\+\-\*\/]|$))/.test(diceString)) return 'Cannot roll a zero or one sided dice.';
        
        const rigged = guildInfo.getRigged();
        const flags = diceString.match(/(?<=~)\w+/g);
        const noFlagsDiceString = diceString.replaceAll(/~\w+/g, '');
        const diceResults = diceRoller(noFlagsDiceString, rigged);
        
        let total = diceResults.total;
        let results = `You rolled: ${diceResults.results}`;

        if (flags) {
            diceResults.total = applyTotalModifier(diceResults.total, flags);
            total = diceResults.total;
            
            const hasAdvFlag = flags.includes('a');
            if (hasAdvFlag || flags.includes('d')) {
                const secondDiceResults = diceRoller(noFlagsDiceString, rigged);
                secondDiceResults.total = applyTotalModifier(secondDiceResults.total, flags);
                if (hasAdvFlag) {
                    total = diceResults.total > secondDiceResults.total ? diceResults.total : secondDiceResults.total;
                }
                else {
                    total = diceResults.total < secondDiceResults.total ? diceResults.total : secondDiceResults.total;
                }
                results = 
                    `1st Roll:   **${diceResults.total}**\t${diceResults.results}\n` +
                    `2nd Roll: **${secondDiceResults.total}**\t${secondDiceResults.results}`;
            }      
        }

        const finalResultString = `>>> ${msg.author.toString()}, **${total}**\n${results}`;

        return (finalResultString.length <= 2000 ? finalResultString : 'Result is too large to display.');
    }
};

const applyTotalModifier = (total, flags) => {
    if (flags.includes('res')) {
        return Math.floor(total/2);
    }
    if (flags.includes('vul')) {
        return Math.floor(total*2);
    }
    return total;
};

const diceRoller = (diceString, riggedStatus) => {
    const dice = diceString.split(/([+-])/);
    const formattedDiceRolled = [];
    for (let i=0;i<dice.length;i++) {
        const element = dice[i];
        if (element.includes('d')) {
            const rolled = diceConverter(element, riggedStatus);
            formattedDiceRolled.push(rolled.formattedResultsJoined);
            dice.splice(i, 1, rolled.results);
        }
    }
    
    const total = calc(dice.join(''));
    const results = formattedDiceRolled.join(', ');
    return {total, results};
};

const diceConverter = (dice, riggedStatus) => {
    const multiAndMax = dice.split('d');
    const multiplier = parseInt(multiAndMax[0]) || 1;
    const max = parseInt(multiAndMax[1]);
    const min = 1;
    const diceRolled = [];
    const formattedResults = [];

    if (riggedStatus <= rigStatus.NONE) {
        for (let i = 0; i < multiplier; i++) {
            const result = randomNoGen(max, min);
            diceRolled.push(result);
            if (result == max || result == min) {
                formattedResults.push('__' + result + '__');
            }
            else {
                formattedResults.push(result);
            }
        }
    }
    else {
        const riggedNumber = (riggedStatus == rigStatus.HIGH ? max : min);
        diceRolled.push(multiplier * riggedNumber);
        for (let i = 0; i < multiplier; i++) {
            formattedResults.push('__' + riggedNumber + '__');
        }
    }

    const results = diceRolled.join('+');
    const formattedResultsJoined = formattedResults.join(', ');

    return {results, formattedResultsJoined};
};

const help = (guildInfo) => {
    const prefix = guildInfo.getPrefix();
    const help = 
    `Can roll any dice you want. Format the command as you would say it, e.g:\n\
    \n${prefix}d20\
    \n${prefix}2d6+5\
    \n${prefix}3d12-3\
    \n${prefix}69d420+911\n\
    \nThe command can also take these arguements:\n\
    \n~a    Advantage (Rolls twice and picks highest)\
    \n~d    Disadvantage (Rolls twice and picks lowest)\
    \n~vul  Vulnerability (Doubles final number)\
    \n~res  Resistance (Halves final number)\n\
    \nThese arguements can used as such:\n\
    \n${prefix}d20 ~a       Rolls the d20 twice and picks the highest\
    \n${prefix}d20 ~d       Rolls the d20 twice and picks the lowest\
    \n${prefix}d20 ~d ~vul  Same as above, but doubles final number`;
    return helpEmbed(help, 'Dice Info');
};