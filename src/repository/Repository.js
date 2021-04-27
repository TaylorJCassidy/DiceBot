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
}

module.exports = Repository;