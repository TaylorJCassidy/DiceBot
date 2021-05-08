class Alias {

    _guildID;
    _userID;
    _aliasName;
    _dice;
    
    constructor(guildID,userID,aliasName,dice) {
        this._guildID = guildID;
        this._userID = userID;
        this._aliasName = aliasName;
        this._dice = dice;
    }

    get guildID() {
        return this._guildID;
    }
    set guildID(value) {
        this._guildID = value;
    }

    get userID() {
        return this._userID;
    }
    set userID(value) {
        this._userID = value;
    }

    get aliasName() {
        return this._aliasName;
    }
    set aliasName(value) {
        this._aliasName = value;
    }

    get dice() {
        return this._dice;
    }
    set dice(value) {
        this._dice = value;
    }

    toJSON() {
        return {
            guildID: this._guildID,
            userID: this._userID,
            aliasName: this._aliasName,
            dice: this._dice
        }
    }

}

module.exports = Alias;