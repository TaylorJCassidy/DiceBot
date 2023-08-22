const DataProviderFactory = require("../dataProviders/DataProviderFactory");
const GuildRepository = require("../repository/GuildRepository");

const dataProvider = DataProviderFactory();
const guildsMap = new Map();

module.exports = {
    setupGuildRepos: (guilds) => {
        const guildKeys = Array.from(guilds.cache.keys());
        for (const key of guildKeys) {
            const repository = new GuildRepository(key, dataProvider);
            guildsMap.set(key, repository);
        }
    },

    addGuild: (guildID) => {
        const repository = new GuildRepository(guildID, dataProvider);
        guildsMap.set(guildID, repository);
    },

    getGuild: (guildID) => {
        return guildsMap.get(guildID);
    },

    deleteGuildCache: (guildID) => {
        const guild = guildsMap.get(guildID);
        guild.deleteGuild();
        guildsMap.delete(guildID);
    }
};