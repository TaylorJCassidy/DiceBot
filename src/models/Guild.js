class Guild {

    _guildID;
    _prefix;
    //-1- unriggable 0-not rigged 1-rigged low 2-rigged high
    _rigged;
    _aliases;

    constructor(guildID,prefix,aliases,rigged) {
        this._guildID = guildID;
        this._prefix = prefix || '.'; 
        this._rigged = rigged || 0;
        this._aliases = new Map(aliases);
    }

    get guildID() {
        return this._guildID;
    }
    set guildID(value) {
        this._guildID = value;
    }

    get prefix() {
        return this._prefix;
    }
    set prefix(value) {
        this._prefix = value;
    }

    get aliases() {
        return this._aliases
    }
    set aliases(value) {
        this._aliases = value;
    }

    get rigged() {
        return this._rigged;
    }
    /**
     * Set the guild's rigged number.
     * -1-unriggable 0-not rigged 1-rigged low 2-rigged high
     * @param {int} rigged the rigged number
     */
    set rigged(rigged) {
        if (rigged < -1 || rigged > 2) {
            throw new Error('Guild rigged number must must be either >= -1 and =< 2'); 
        }
        this._rigged = rigged;
    }

    toJSON() {
        return {
            guildID: this.guildID,
            prefix: this.prefix,
            rigged: this.rigged,
            aliases: Array.from(this.aliases)
        }
    }
}

module.exports = Guild;