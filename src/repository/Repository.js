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

    deleteGuild(guildID) {
        return this.dao.deleteGuild(guildID);
    }
}

module.exports = Repository;