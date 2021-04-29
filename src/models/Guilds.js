class Guilds {

    static defaults = {
        prefix: '.',
        aliases: []
    }
    prefix
    #aliases;

    constructor(newGuild) {
        this.prefix = newGuild.prefix || Guilds.defaults.prefix;
        this.#aliases = newGuild.aliases || Guilds.defaults.aliases;
    }

    get aliases() {
        return new Map(this.#aliases);
    }

    set aliases(aliases) {
        this.#aliases = Array.from(aliases.entries());
    }
}

module.exports = Guilds;