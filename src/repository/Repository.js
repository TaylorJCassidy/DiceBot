const JSONDAO = require('../DAOs/JSONDAO.js')

class Repository {
    dao;

    constructor(guildID) {
        this.dao = new JSONDAO(guildID);
    }

    getPrefix() {
        return this.dao.getPrefix();
    }

    setPrefix(prefix) {
        return this.dao.setPrefix(prefix);
    }

    getAlias(alias) {
        return this.dao.getAlias(alias);
    }

    setAlias(alias,dice) {
        return this.dao.setAlias(alias,dice);
    }

    getAliases(aliases) {
        return this.dao.getAliases(aliases);
    }

    setAliases(aliases) {
        return this.dao.setAliases(aliases);
    }
}

module.exports = Repository;