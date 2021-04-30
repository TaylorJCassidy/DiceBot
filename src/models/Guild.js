class Guild {

    prefix = '.'
    #aliases = [];

    constructor() {

    }

    get aliases() {
        return new Map(this.#aliases);
    }

    set aliases(aliases) {
        this.#aliases = Array.from(aliases.entries());
    }
}

module.exports = Guild;