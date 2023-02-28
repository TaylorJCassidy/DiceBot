const { Guild } = require('discord.js');
const GuildCache = require('../caches/GuildCache.js');

module.exports = {
    /**
     * Returns a map of GuildCache objects for later CRUD usage
     * @param {Map<String,Guild>} guilds all guilds the bot belongs to
     * @returns {Map<String,GuildCache>} The guildCaches, with the Discord guild IDs as keys and GuildCache objects as values.
     */
    getGuildCaches: (guilds) => {
        const guildCache = new Map();
        const guildKeys = Array.from(guilds.cache.keys());
        for (const key of guildKeys) {
            guildCache.set(key,new GuildCache(key));
        }
        return guildCache;
    }
};