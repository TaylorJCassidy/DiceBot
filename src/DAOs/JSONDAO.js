const Guild = require("../models/Guilds.js")
const fs = require('fs');

class JSONDAO {

    static filepath = './guildConfigs/';
    filename;
    guild;

    constructor(guildID) {
        this.guildID = guildID;
        this.filename = `${JSONDAO.filepath}${guildID}.json`
    }

    getJsonFile() {
        try {
            const readObj = JSON.parse(fs.readFileSync(this.filename));
            return new Guild(readObj);
        }
        catch (e) {
            return null;
        }
    }

    setJsonFile() {
        try {
            fs.writeFileSync(this.filename,JSON.stringify(this.guild));
            return true;
        }
        catch (e) {
            return false;
        }
    }



    getPrefix() {
        if (this.guild === undefined) {
            this.guild = this.getJsonFile();
            if (this.guild === null) {
                this.guild = new Guild();
                fs.writeFileSync(this.filename,JSON.stringify(this.guild));
            }
        }
        return this.guild.prefix;
    }

    setPrefix(prefix) {
        this.guild.prefix = prefix;
        return this.setJsonFile();
    }

    getAlias(alias) {
        return this.guild.aliases.get(alias);
    }

    setAlias(alias,dice) {
        this.guild.aliases.set(alias,dice);
        return this.setJsonFile();
    }

    getAliases() {
        return this.guild.aliases;
    }

    setAliases(aliases) {
        this.guild.aliases = aliases;
        this.setJsonFile();
    }
}

module.exports = JSONDAO;