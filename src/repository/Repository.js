const JSONDAO = require('../DAOs/JSONDAO.js')

class Repository {
    dao;

    constructor(guildID) {
        this.dao = new JSONDAO(guildID);
    }

    getGuild() {
        return this.dao.getGuild();
    }

    setGuild(guild) {
        return this.dao.setGuild(guild);
    }

    updateGuild(guild) {
        return this.dao.updateGuild(guild);
    }

    deleteGuild() {
        return this.dao.deleteGuild();
    }

    getAliases() {
        return this.dao.getAliases();
    }

    setAlias(alias) {
        return this.dao.setAlias(alias);
    }

    updateAlias(alias) {
        return this.dao.updateAlias(alias);
    }

    deleteAlias(aliasName) {
        return this.dao.deleteAlias(aliasName);
    }
}

module.exports = Repository;