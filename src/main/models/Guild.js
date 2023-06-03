const {defaultPrefix} = require('../configs/app.json');

/**
 * @class
 * Dicebots Guild model class. This should be used whenever a guild is read or needs to be written to a filestore.
 */
class Guild {

    /**@private */
    _guildID;
    /**@private */
    _prefix;
    /**
     * @private
     * -1- unriggable 0-not rigged 1-rigged low 2-rigged high
     */
    _rigged;
    /**@private */
    _aliases;
    
    /**
     * Default constructor
     * @param {String} guildID Discord guild ID of guild
     * @param {String} prefix Guilds prefix
     * @param {Array} aliases Any aliases to be attached to the guild
     * @param {Number} rigged Rigged number -1-unriggable 0-not rigged 1-rigged low 2-rigged high
     */
    constructor(guildID, prefix, aliases, rigged) {
        this._guildID = guildID;
        this._prefix = prefix || defaultPrefix; 
        this._rigged = Guild._validRigged(rigged) || 0;
        this._aliases = new Map(aliases);     
    }

    /**
     * Gets the guilds ID
     * @returns {String} the guild ID
     */
    get guildID() {
        return this._guildID;
    }

    /**
     * Sets the guilds ID
     * @param {String} guildID the guild ID to set
     */
    set guildID(guildID) {
        this._guildID = guildID;
    }

    /**
     * Gets the guilds prefix
     * @returns {String} the guilds prefix
     */
    get prefix() {
        return this._prefix;
    }

    /**
     * Sets the guilds prefix
     * @param {String} prefix the prefix to set
     */
    set prefix(prefix) {
        this._prefix = prefix;
    }

    /**
     * Gets the guilds aliases
     * @returns {Map<String,Alias>} the guilds aliases
     */
    get aliases() {
        return this._aliases;
    }

    /**
     * Sets the guilds aliases
     * @param {Map<String,Alias>} aliases the guilds aliases to set
     */
    set aliases(aliases) {
        this._aliases = aliases;
    }

    /**
     * Gets the guilds rigged number
     * -1-unriggable 0-not rigged 1-rigged low 2-rigged high
     * @returns {Number} the guilds rigged number
     */
    get rigged() {
        return this._rigged;
    }

    /**
     * Set the guilds rigged number
     * -1-unriggable 0-not rigged 1-rigged low 2-rigged high
     * @param {Number} rigged the guilds rigged number to set
     */
    set rigged(rigged) {
        this._rigged = Guild._validRigged(rigged);
    }

    /**
     * @private
     * If rigged number is out of range, throws an exception
     * @param {Number} rigged Rigged number
     */
    static _validRigged(rigged) {
        if (rigged < -1 || rigged > 2) {
            throw new Error('Guild rigged number must must be either >= -1 and =< 2'); 
        }
        else {
            return rigged;
        }
    }

    /**
     * Returns Guild object as a plain javascript object without methods
     * This is used by JSON.stringify and should not be modified
     * @returns {Object} Guild object
     */
    toJSON() {
        return {
            guildID: this.guildID,
            prefix: this.prefix,
            rigged: this.rigged,
            aliases: Array.from(this.aliases)
        };
    }
}

module.exports = Guild;