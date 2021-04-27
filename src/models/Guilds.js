class Guilds {

    static defaults = {
        prefix: '.'
    }
    prefix

    constructor(prefix) {
        this.prefix = prefix || Guilds.defaults.prefix;
    }

}

module.exports = Guilds;