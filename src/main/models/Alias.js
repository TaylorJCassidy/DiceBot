/**
 * @class
 * Dicebots Alias model class. This should be used whenever a alias is read or needs to be written to a filestore.
 */
class Alias {

    /**@private*/
    _guildID;
    /**@private*/
    _userID;
    /**@private*/
    _aliasName;
    /**@private*/
    _dice;

    /**
     * Default constructor
     * @param {String} guildID Discord guild ID of guild where alias was created
     * @param {String} userID Discord user ID of alias author
     * @param {String} aliasName alias name
     * @param {String} dice dice to roll
     */
    constructor(guildID,userID,aliasName,dice) {
        this._guildID = guildID;
        this._userID = userID;
        this._aliasName = aliasName;
        this._dice = dice;
    }

    /**
     * Gets alias' guild ID
     * @returns {String} alias' guild ID
     */
    get guildID() {
        return this._guildID;
    }

    /**
     * Sets the alias' guild ID
     * @param {String} guildID alias' guild ID to set
     */
    set guildID(guildID) {
        this._guildID = guildID;
    }

    /**
     * Gets the alias' userID
     * @returns {String} alias' user ID
     */
    get userID() {
        return this._userID;
    }

    /**
     * Sets the alias' userID
     * @param {String} userID alias' user ID to set
     */
    set userID(userID) {
        this._userID = userID;
    }

    /**
     * Gets the alias name
     * @returns {String} the alias name
     */
    get aliasName() {
        return this._aliasName;
    }

    /**
     * Sets the alias name
     * @param {String} aliasName the alias name to set
     */
    set aliasName(aliasName) {
        this._aliasName = aliasName;
    }

    /**
     * Gets the alias' dice
     * @returns {String} the alias' dice
     */
    get dice() {
        return this._dice;
    }

    /**
     * Sets the alias' dice
     * @param {String} dice the alias' dice to set
     */
    set dice(dice) {
        this._dice = dice;
    }

    /**
     * Returns Alias object as a plain javascript object without methods
     * This is used by JSON.stringify and should not be modified
     * @returns {Object} Alias object
     */
    toJSON() {
        return {
            guildID: this._guildID,
            userID: this._userID,
            aliasName: this._aliasName,
            dice: this._dice
        };
    }

}

module.exports = Alias;