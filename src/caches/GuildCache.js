const Repository = require("../repository/Repository");

class GuildCache {
    guild;
    repository;

    constructor(guildID) {
        this.repository = new Repository(guildID);
        this.guild = this.repository.getGuild();
    }

    getPrefix() {
        return this.guild.prefix;
    }

    setPrefix(prefix) {
        this.guild.prefix = prefix;
        return this.repository.setGuild(this.guild);
    }

    getAlias(alias) {
        return this.guild.getAlias(alias);
    }

    setAlias(alias,dice) {
        this.guild.setAlias(alias,dice);
        return this.repository.setGuild(this.guild);
    }

    removeAlias(alias) {
        this.guild.removeAlias(alias);
        return this.repository.setGuild(this.guild);
    }

    getAliases() {
        return this.guild.getAliases();
    }

    getRigged() {
        return this.rigged;
    }

    setRigged(rigged) {
        this.guild.setRigged(rigged);
        return this.repository.setGuild(this.guild);
    }
}

module.exports = GuildCache;