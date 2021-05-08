const fs = require('fs');
const Alias = require('../models/Alias');
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
            this.localGuild = this._jsonGuild(guildID,json);
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

    _jsonGuild(guildID,json) {
        let aliases = [];
        let i = 0;
        json.aliases.forEach(element => {
            aliases[i] = [element[1].aliasName,new Alias(guildID,element[1].userID,element[1].aliasName,element[1].dice)];
        });
        return new Guild(guildID,json.prefix,aliases,json.rigged);
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