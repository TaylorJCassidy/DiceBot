const Guild = require('../models/Guild.js');
const Alias = require('../models/Alias.js');
const JSONDAO = require('../DAOs/JSONDAO.js');

/**
 * @class
 * Pulls data from external persistant data store
 */
class Repository {
    /**@private */
    _dao;

    /**
     * Default constructor
     * @param {String} guildID Discord guild ID to read from or write to
     */
    constructor(guildID) {
        this._dao = new JSONDAO(guildID);
    }

    /**
     * Returns guild from datastore
     * @returns {Guild} associated Guild object, or null if no Guild data is held
     */
    getGuild() {
        return this._dao.getGuild();
    }

    /**
     * Writes new guild to datastore
     * @param {Guild} guild Guild to write to datastore
     * @returns {boolean} successful or not
     */
    setGuild(guild) {
        return this._dao.setGuild(guild);
    }

    /**
     * Updates guild currently within datastore
     * @param {Guild} guild updated Guild to write to datastore
     * @returns {boolean} successful or not
     */
    updateGuild(guild) {
        return this._dao.updateGuild(guild);
    }

    /**
     * Deletes guild from datastore
     * @returns {boolean} successful or not
     */
    deleteGuild() {
        return this._dao.deleteGuild();
    }

    /**
     * Gets all aliases assocaited with current guild from datastore, or an empty map if guild has no aliases
     * @returns {Map<String,Alias>} a map of all assocaited aliases, with aliasNames as keys and Alias objects as values
     */
    getAliases() {
        return this._dao.getAliases();
    }

    /**
     * Writes new alias to datastore
     * @param {Alias} alias Alias to write to datastore
     * @returns {boolean} successful or not
     */
    setAlias(alias) {
        return this._dao.setAlias(alias);
    }

    /**
     * Updates alias currently within datastore
     * Updates alias based on alias parameter's user and guild ID
     * @param {Alias} alias updated Alias to write to datastore
     * @returns {boolean} successful or not
     */
    updateAlias(alias) {
        return this._dao.updateAlias(alias);
    }

    /**
     * Deletes an alias from the datastore
     * @param {String} aliasName aliasName of alias to remove
     * @returns {boolean} successful or not
     */
    deleteAlias(aliasName) {
        return this._dao.deleteAlias(aliasName);
    }
}

module.exports = Repository;