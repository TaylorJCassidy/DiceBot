const guilds = new Map();

module.exports = {
    getGuild: async (guildID) => {
        return guilds.get(guildID);
    },

    setGuild: async (guild) => {
        return guilds.set(guild.guildID, guild);
    },

    deleteGuild: (guildID) => {
        guilds.delete(guildID);
    }
};