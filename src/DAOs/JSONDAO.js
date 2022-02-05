const fs = require('fs');
const Alias = require('../models/Alias');
const Guild = require('../models/Guild');

/**
 * @class
 * A JSON Data Access Object, used to read and write from a JSON data source
 */
class JSONDAO {

    static FILEPATH = './configs/guildConfigs/';
    /**@private */
    _filename;
    /**@private */
    _localGuild;

    /**
     * Default constructor
     * @param {String} guildID Discord Guild ID of guild to read or write to
     */
    constructor(guildID) {
        this.guildID = guildID;
        this._filename = `${JSONDAO.FILEPATH}${guildID}.json`;
        try {
            let json = JSON.parse(fs.readFileSync(this._filename));
            this._localGuild = this._jsonGuild(guildID,json);
        }
        catch(e) {
            this._localGuild = new Guild(guildID);
        }   
    }

    /**
     * Writes the localGuild to a JSON file in the filename location
     * @private
     * @returns {boolean} successful or not 
     */
    _writeToFile() {
        try {
            let json = JSON.stringify(this._localGuild);
            fs.writeFileSync(this._filename,json);
            return true;
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }

    /**
     * Translates and returns the json to actual objects
     * @private
     * @param {String} guildID guild id of the guild
     * @param {String} json JSON guild string to translate
     * @returns 
     */
    _jsonGuild(guildID,json) {
        let aliases = [];
        let i = 0;
        json.aliases.forEach(element => {
            aliases[i++] = [element[1].aliasName,new Alias(guildID,element[1].userID,element[1].aliasName,element[1].dice)];
        });
        return new Guild(guildID,json.prefix,aliases,json.rigged);
    }

    /**
     * Returns the guild object from the JSON file
     * @returns {Guild} associated guild object
     */
    getGuild() {
        //need to construct new object as js returns by-reference, and any modifications to localGuild would affect here
        return new Guild(this._localGuild.guildID,this._localGuild.prefix,this._localGuild.aliases,this._localGuild.rigged);
    }

    /**
     * Writes guild object to the JSON file
     * @param {Guild} guild guild to write to JSON file
     * @returns {boolean} successful or not
     */
    setGuild(guild) {
        this._localGuild = guild;
        return this._writeToFile();
    }

    /**
     * Updates guild within the JSON file
     * @param {Guild} guild guild to update to JSON file
     * @returns {boolean} successful or not
     */
    updateGuild(guild) {
        return this.setGuild(guild);
    }

    /**
     * Deletes the guild JSON file
     * @returns {boolean} successful or not
     */
    deleteGuild() {
        try{
            fs.rmSync(this._filename);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    /**
     * Returns the aliases map from the JSON file
     * @returns {Map<String,Alias>} aliases map
     */
    getAliases() {
        return this._localGuild.aliases;
    }

    /**
     * Adds an alias object to the JSON file
     * @param {Alias} alias 
     * @returns {boolean} successful or not
     */
    setAlias(alias) {
        this._localGuild.aliases.set(alias.aliasName,alias);
        return this._writeToFile();
    }

    /**
     * Updates an alias within the JSON file
     * @param {Alias} alias 
     * @returns {boolean} successful or not
     */
    updateAlias(alias) {
        return this.setAlias(alias);
    }

    /**
     * Deletes an alias from the JSON file
     * @param {String} aliasName alias name of alias to delete
     * @returns {boolean} successful or not
     */
    deleteAlias(aliasName) {
        this._localGuild.aliases.delete(aliasName);
        return this._writeToFile();
    }
}

module.exports = JSONDAO;