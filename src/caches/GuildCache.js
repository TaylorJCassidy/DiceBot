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
        return this.guild.aliases.get(alias);
    }

    setAlias(alias,dice) {
        this.guild.aliases.set(alias,dice);
        return this.repository.setGuild(this.guild);
    }

    getAliases() {
        return this.guild.aliases;
    }

    setAliases(aliases) {
        this.guild.aliases = aliases;
        return this.repository.setGuild(this.guild);
    }
}

module.exports = GuildCache;