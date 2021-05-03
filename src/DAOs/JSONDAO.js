const fs = require('fs');
const JSONmodel = require("./JSONmodel.js");

class JSONDAO {

    static filepath = './guildConfigs/';
    filename;
    jsonModel;

    constructor(guildID) {
        this.guildID = guildID;
        this.filename = `${JSONDAO.filepath}${guildID}.json`;
        try {
            let json = JSON.parse(fs.readFileSync(this.filename));
            this.jsonModel = new JSONmodel(json);
        }
        catch(e) {
            this.jsonModel = new JSONmodel();
        }
        
    }

    getGuild() {
        return this.jsonModel.guild;
    }

    setGuild(guild) {
        try {
            this.jsonModel.guild = guild;
            fs.writeFileSync(this.filename,JSON.stringify(this.jsonModel));
            return true;
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }

    deleteGuild() {
        try{
            fs.rmSync(this.filename);
            this.jsonModel = null;
            return true;
        }
        catch(e) {
            return false;
        }     
    }
}

module.exports = JSONDAO;