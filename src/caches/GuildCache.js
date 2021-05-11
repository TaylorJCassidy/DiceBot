const Guild = require("../models/Guild");
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
        return this.repository.updateGuild(this.guild);
    }

    setAlias(alias) {
        this.guild.aliases.set(alias.aliasName,alias);
        return this.repository.setAlias(alias);
    }

    updateAlias(alias) {
        this.guild.aliases.set(alias.aliasName,alias);
        return this.repository.updateAlias(alias);
    }

    deleteAlias(aliasName) {
        this.guild.aliases.delete(aliasName)
        return this.repository.deleteAlias(aliasName);
    }

    getAliases() {
        return this.guild.aliases;
    }

    getRigged() {
        return this.guild.rigged;
    }
    setRigged(rigged) {
        this.guild.rigged = rigged;
        return this.repository.updateGuild(this.guild);
    }
}

module.exports = GuildCache;