class Guild {

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

    getAliases() {
        return new Map(this.aliases);
    }

    setAliases(aliases) {
        this.aliases = Array.from(aliases.entries());
    }
}

module.exports = Guild;