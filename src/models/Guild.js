class Guild {

    prefix;
    //-1- unriggable 0-not rigged 1-rigged low 2-rigged high
    rigged;

    constructor(guild) {
        if (guild === undefined) {
            this.prefix = '.'
            this.aliases = [];
            this.rigged = 0;
        }
        else {
            this.prefix = guild.prefix || '.';
            this.aliases = guild.aliases || [];
            this.rigged = guild.rigged || 0;
        }
    }

    setAlias(alias,info) {
        let lastIndex = this.aliases.length;
        this.aliases[lastIndex] = [alias,info];
    }

    getAlias(alias) {
        return new Map(this.aliases).get(alias);
    }

    removeAlias(alias) {
        let map = this.getAliases();
        map.delete(alias);
        this.setAliases(map);
    }

    getAliases() {
        return new Map(this.aliases);
    }

    setAliases(aliases) {
        this.aliases = Array.from(aliases.entries());
    }

    getRigged() {
        return this.rigged;
    }

    /**
     * Set the guild's rigged number.
     * -1-unriggable 0-not rigged 1-rigged low 2-rigged high
     * @param {int} rigged the rigged number
     */
    setRigged(rigged) {
        if (rigged < -1 || rigged > 2) {
            throw new Error('Guild rigged number must must be either >= -1 and =< 2'); 
        }
        this.rigged = rigged;
    }
}

module.exports = Guild;