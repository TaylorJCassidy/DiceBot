const fs = require('fs');
const Guild = require('../models/Guild');

class JSONDAO {

    static filepath = './guildConfigs/';
    filename;
    localGuild;

    constructor(guildID) {
        this.guildID = guildID;
        this.filename = `${JSONDAO.filepath}${guildID}.json`;
        try {
            let json = JSON.parse(fs.readFileSync(this.filename));
            this.localGuild = new Guild(guildID,json.prefix,json.aliases,json.rigged);
        }
        catch(e) {
            this.localGuild = new Guild(guildID);
        }
        
    }

    writeToFile() {
        try {
            let json = JSON.stringify(this.localGuild)
            fs.writeFileSync(this.filename,json);
            return true;
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }

    getGuild() {
        //need to construct new object as js returns by-reference, and any modifications to guildCache would affect here
        return new Guild(this.localGuild.guildID,this.localGuild.prefix,this.localGuild.aliases,this.localGuild.rigged);
    }

    setGuild(guild) {
        this.localGuild = guild;
        return this.writeToFile();
    }

    updateGuild(guild) {
        this.setGuild(guild);
    }

    deleteGuild() {
        try{
            fs.rmSync(this.filename);
            this.localGuild = null;
            return true;
        }
        catch(e) {
            return false;
        }
    }

    getAliases() {
        return this.localGuild.aliases;
    }

    setAlias(alias) {
        this.localGuild.aliases.set(alias.aliasName,alias)
        return this.writeToFile();
    }

    updateAlias(alias) {
        this.setAlias(alias);
    }

    deleteAlias(aliasName) {
        this.localGuild.aliases.delete(aliasName);
        return this.writeToFile();
    }
}

module.exports = JSONDAO;