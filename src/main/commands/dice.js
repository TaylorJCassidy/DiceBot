const helpEmbed = require('../utils/helpEmbed.js');
const randomNoGen = require('../utils/randomNoGen.js');
const maths = require('./maths.js');

module.exports = {
    name: 'dice',
    run: (msg) => {
        const prefix = msg.guild.cache.getPrefix();
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
        msg.reply(helpEmbed(help, 'Dice Info'));
    },

    diceController: (msg, dicecontent) => {
        dicecontent = dicecontent.toLowerCase();
        // eslint-disable-next-line no-useless-escape
        if (/^(d(0|1) *([\+\-\*\/]|$))/.test(dicecontent)) {
            msg.reply('Cannot roll a zero or one sided dice.');
        }
        else {
            const argsIndex = dicecontent.search(/~/);
            if (argsIndex > 0) {
                const diceToRoll = dicecontent.substring(0, argsIndex);
                const args = dicecontent.substring(argsIndex).match(/(?<=~)\w+/g);
                rollWithArguements(msg, diceToRoll, args);
            }
            else {
                const diceResults = diceroller(dicecontent, msg.guild.cache.getRigged());
                const msgReturn = `>>> ${msg.author.toString()}, **${diceResults.total}**\nYou rolled: ${diceResults.diceRolls}`;
                formatReply(msg, msgReturn);
            }
        }
    }
};

const rollWithArguements = (msg, dicecontent, args) => {
    const diceResults = diceroller(dicecontent, msg.guild.cache.getRigged());
    let msgReturn = `>>> ${msg.author.toString()}, `;
    
    if (args.indexOf('a') >= 0) {
        const diceResults2 = diceroller(dicecontent, msg.guild.cache.getRigged());
        diceResults.total = resvul(diceResults.total, args);
        diceResults2.total = resvul(diceResults2.total, args);
        msgReturn += `**${diceResults.total > diceResults2.total ? diceResults.total:diceResults2.total}**` +
        `\n1st Roll:   **${diceResults.total}**\t${diceResults.diceRolls}` +
        `\n2nd Roll: **${diceResults2.total}**\t${diceResults2.diceRolls}`;
    }
    else if (args.indexOf('d') >= 0) {
        const diceResults2 = diceroller(dicecontent, msg.guild.cache.getRigged());
        diceResults.total = resvul(diceResults.total, args);
        diceResults2.total = resvul(diceResults2.total, args);
        msgReturn += `**${diceResults.total < diceResults2.total ? diceResults.total:diceResults2.total}**` +
        `\n1st Roll:   **${diceResults.total}**\t${diceResults.diceRolls}` +
        `\n2nd Roll: **${diceResults2.total}**\t${diceResults2.diceRolls}`;
    }
    else {
        msgReturn += `**${resvul(diceResults.total, args)}**\nYou rolled: ${diceResults.diceRolls}`;
    }
    formatReply(msg, msgReturn);
};

const resvul = (total, args) => {
    if (args.indexOf('res') >= 0) {
        return Math.floor(total/2);
    }
    else if (args.indexOf('vul') >= 0) {
        return Math.floor(total*2);
    }
    else {
        return total;
    }
};

const formatReply = async (msg, msgReturn) => {
    
    if (msgReturn.length > 2000) {
        msg.reply('Result is too large to display.');
    }
    else {
        msg.channel.send(msgReturn);
    }      
};

const diceroller = (dicecontent, rigged) => {
    let diceRolls = '';

    do {
        let multiplier;
        let startIndex;

        const rMultiplier = dicecontent.match(/\d+(?=d)/);
        const rMax = dicecontent.match(/(?<=d)\d+/);
        if (rMultiplier === null || rMax.index < rMultiplier.index) {
            multiplier = 1;
            startIndex = rMax.index-1;
        }
        else {
            startIndex = rMultiplier.index;
            multiplier = parseInt(rMultiplier[0]);
        }
        const max = parseInt(rMax[0]);
        const endIndex = rMax.index+rMax[0].length;
        let randomNumbers = 0;

        if (rigged > 0) {
            if (rigged == 2) {
                randomNumbers = max*multiplier;
                diceRolls += `__${max}__, `.repeat(multiplier);
            }
            else {
                randomNumbers = multiplier;
                diceRolls += '__1__, '.repeat(multiplier);
            }
        }
        else {
            do {
                const randomNo = randomNoGen(max, 1);
                randomNumbers += randomNo;
                if (randomNo == max || randomNo == 1) {
                    diceRolls += `__${randomNo}__, `;
                }
                else {
                    diceRolls += randomNo + ', ';
                }
                multiplier--;
            }
            while (multiplier > 0);
        }
        dicecontent = dicecontent.replace(dicecontent.slice(startIndex, endIndex), randomNumbers);
    }
    while (dicecontent.includes('d'));
    return {
        total: maths.calc(dicecontent),
        diceRolls: diceRolls.substring(0, diceRolls.length-2)
    };
};