class Alias {

    _guildID;
    _aliasName;
    _userID;
    _dice;
    
    constructor(guildID,aliasName,userID,dice) {
        this.guildID = guildID;
        this.userID = userID;
        this.aliasName = aliasName;
        this.dice = dice;
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

}

module.exports = Alias;