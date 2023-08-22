class GuildRepository {
    #guildID;
    #dataProvider;

    constructor(guildID, dataProvider) {
        this.#guildID = guildID;
        this.#dataProvider = dataProvider;
    }

    async getPrefix() {
        return await this.#dataProvider.getPrefix(this.#guildID);
    }

    async setPrefix(prefix) {
        return await this.#dataProvider.setPrefix(this.#guildID, prefix);
    }

    async getRigged() {
        return await this.#dataProvider.getRigged(this.#guildID);
    }

    async setRigged(rigged) {
        return await this.#dataProvider.setRigged(this.#guildID, rigged);
    }

    // setAlias(alias) {
        
    // }

    // updateAlias(alias) {
        
    // }

    // deleteAlias(aliasName) {
        
    // }

    // getAliases() {
        
    // }

    // deleteGuild() {
        
    // }
}

module.exports = GuildRepository;