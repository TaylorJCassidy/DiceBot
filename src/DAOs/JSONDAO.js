const Guild = require("../models/Guilds.js")
const fs = require('fs');

class JSONDAO {

    static filepath = './guildConfigs/';
    guildID;
    filename;

    constructor(guildID) {
        this.guildID = guildID;
        this.filename = `${JSONDAO.filepath}${this.guildID}.json`
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
        let guild = this.jsonfile;
        if (guild === null) {
            guild = new Guild();
            fs.writeFileSync(this.filename,JSON.stringify(guild));
        }
        return guild.prefix;
    }

    setPrefix(prefix) {
        const guild = this.jsonfile;
        guild.prefix = prefix;
        fs.writeFileSync(this.filename,JSON.stringify(guild));
    }
}

module.exports = JSONDAO;