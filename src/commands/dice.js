module.exports = {
    name: 'dice',
    run: (msg,args) => {
        const Discord = require('discord.js');

        const prefix = msg.guild.prefix;
        const help = 
        `Can roll any dice you want. Format the command as you would say it, e.g:\n\
        \n${prefix}d20\
        \n${prefix}2d6+5\
        \n${prefix}3d12-3\
        \n${prefix}69d420+911\n\ `/*
        \nThe command can also take these arguements:\n\
        \n~a    Advantage (Rolls twice and picks highest)\
        \n~d    Disadvantage (Rolls twice and picks lowest)\
        \n~vul  Vulnerability (Doubles final number)\
        \n~res  Resistance (Halves final number)\n\
        \nThese arguements can used as such:\n\
        \n${prefix}d20 ~a       Rolls the d20 twice and picks the highest\
        \n${prefix}d20 ~d       Rolls the d20 twice and picks the lowest\
        \n${prefix}d20 ~d ~vul  Same as above, but doubles final number`;*/
        
        const finalHelp = new Discord.MessageEmbed().setDescription('```' + help + '```').setTitle('Dice Info');
        msg.channel.send(finalHelp);
    },
    roll: (msg,dicecontent) => {
        const {randomNoGen} = require('../utils/randomNoGen.js');
        dicecontent = dicecontent.toLowerCase();
        let diceRolls = '';

        do {
            let multiplier; 
            let max;
            let startIndex;
            let endIndex;

            let rMulitplier = dicecontent.match(/\d+(?=d)/);
            let rMax = dicecontent.match(/(?<=d)\d+/);
            if (rMulitplier === null) {
                multiplier = 1;
                startIndex = rMax.index-1;
            }
            else {
                startIndex = rMulitplier.index;
                multiplier = parseInt(rMulitplier[0]);
            }
            max = parseInt(rMax[0]);
            endIndex = rMax.index+rMax[0].length;
            
            let toReplace = dicecontent.slice(startIndex,endIndex);
            let randomNumbers = 0;
            for (let i=0;i<multiplier;i++) {
                let randomNo = randomNoGen(max,1);
                randomNumbers += randomNo;
                if (randomNo == max || randomNo == 1) {
                    diceRolls += '__' + randomNo + '__, ';
                }
                else {
                    diceRolls += randomNo + ', ';
                }
            }
            dicecontent = dicecontent.replace(toReplace,randomNumbers);
        }
        while (dicecontent.includes('d'));
        let msgReturn = `>>> ${msg.author.toString()}, **${new Function('return ' + dicecontent)()}**\
        \nYou rolled: ${diceRolls.substring(0,diceRolls.length-2)}`
        msg.channel.send(msgReturn);
    }
}