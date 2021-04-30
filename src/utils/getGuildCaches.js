module.exports = {
    getGuildCaches: (guilds) => {
        const GuildCache = require('../caches/GuildCache.js')

        const guildCache = new Map();
        const guildKeys = Array.from(guilds.cache.keys());
        let i = 0;
        for (key of guildKeys) {
            guildCache.set(key,new GuildCache(key))
        }
        return guildCache;
    }
}