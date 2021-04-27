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

    get jsonfile() {
        try {
            return JSON.parse(fs.readFileSync(this.filename));
        }
        catch (e) {
            return null;
        }
    }

    getPrefix() {
        if (this.guild === undefined) {
            this.guild = this.jsonfile;
            if (this.guild === null) {
                this.guild = new Guild();
                fs.writeFileSync(this.filename,JSON.stringify(this.guild));
            }
        }
        return this.guild.prefix;
    }

    setPrefix(prefix) {
        this.guild.prefix = prefix;
        try {
            fs.writeFileSync(this.filename,JSON.stringify(this.guild));
            return true;
        }
        catch (e) {
            return false;
        }
    }
}

module.exports = JSONDAO;