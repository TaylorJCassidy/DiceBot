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
        return this.guild.getAliases.get(alias);
    }

    setAlias(alias,dice) {
        this.guild.getAliases.set(alias,dice);
        return this.repository.setGuild(this.guild);
    }

    getAliases() {
        return this.guild.getAliases();
    }

    setAliases(aliases) {
        this.guild.setAliases(aliases);
        return this.repository.setGuild(this.guild);
    }
}

module.exports = GuildCache;