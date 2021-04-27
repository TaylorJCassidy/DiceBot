module.exports = {
    getGuildRepos: (guilds) => {
        const Repository = require('../repository/Repository.js')

        const repoMap = new Map();
        const guildKeys = Array.from(guilds.cache.keys());
        let i = 0;
        for (key of guildKeys) {
            repoMap.set(key,new Repository(key))
        }
        return repoMap;
    }
}