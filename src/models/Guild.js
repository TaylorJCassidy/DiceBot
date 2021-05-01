class Guild {

    prefix;
    alias;

    constructor(guild) {
        if (guild === undefined) {
            this.prefix = '.'
            this.aliases = [];
        }
        else {
            this.prefix = guild.prefix || '.';
            this.aliases = guild.aliases || [];
        }
    }

    setAlias(alias,dice) {
        let lastIndex = this.aliases.length;
        this.aliases[lastIndex] = [alias,dice];
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
}

module.exports = Guild;