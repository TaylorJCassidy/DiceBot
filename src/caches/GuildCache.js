const Repository = require('../repository/Repository');
const Alias = require('../models/Alias')

/**
 * @class
 * Works to cache guild information
 * Preferable to use over a straight repository call
 */
class GuildCache {
    /**@private */
    _guild;
    /**@private */
    _repository;

    /**
     * Default constructor
     * @param {String} guildID Discord guild ID of the guild to cache
     */
    constructor(guildID) {
        this._repository = new Repository(guildID);
        this._guild = this._repository.getGuild();
    }

    /**
     * Returns the guilds prefix from the cache
     * @returns {String} the guild prefix 
     */
    getPrefix() {
        return this._guild.prefix;
    }

    /**
     * Sets the guilds prefix within the cache and the filestore
     * @param {String} prefix new guild prefix
     * @returns {boolean} successful or not
     */
    setPrefix(prefix) {
        this._guild.prefix = prefix;
        return this._repository.updateGuild(this._guild);
    }

    /**
     * Returns the rigged number from the cache
     * @returns {number} the guilds rigged number
     */
    getRigged() {
        return this._guild.rigged;
    }

    /**
     * Sets the rigged number within the cache and the filestore
     * @param {number} rigged new rigged number
     * @returns {boolean} successful or not
     */
    setRigged(rigged) {
        this._guild.rigged = rigged;
        return this._repository.updateGuild(this._guild);
    }

    /**
     * Adds an alias to the aliases within the cache and the filestore
     * @param {Alias} alias alias to add
     * @returns {boolean} successful or not
     */
    setAlias(alias) {
        this._guild.aliases.set(alias.aliasName,alias);
        return this._repository.setAlias(alias);
    }

    /**
     * Updates an existing alias within the guild cache
     * Updates alias based on alias parameter's user and guild ID
     * @param {Alias} alias alias to update.
     * @returns {boolean} successful or not
     */
    updateAlias(alias) {
        this._guild.aliases.set(alias.aliasName,alias);
        return this._repository.updateAlias(alias);
    }

    /**
     * Deletes an alias from both the guild cache and the filestore
     * @param {String} aliasName name of alias to delete
     * @returns {boolean} successful or not
     */
    deleteAlias(aliasName) {
        this._guild.aliases.delete(aliasName)
        return this._repository.deleteAlias(aliasName);
    }

    /**
     * Returns all the aliases currently stored in the guild cache
     * @returns {Map<String,Alias>} aliases as a map
     */
    getAliases() {
        return this._guild.aliases;
    }

    /**
     * Permanently deletes all guild data from both the cache and the filestore
     * @returns {boolean} successful or not
     */
    deleteGuild() {
        return this._repository.deleteGuild();
    }
}

module.exports = GuildCache;