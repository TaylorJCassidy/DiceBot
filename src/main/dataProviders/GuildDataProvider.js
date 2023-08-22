const logger = require('../utils/logger');
const log = logger('GuildDataProvider');
const {cache: {invalidateRetryAttempts}} = require('../configs/app.json');

class GuildDataProvider {
    #dao;
    #cache;

    constructor(dao, cache) {
        this.#dao = dao;
        this.#cache = cache;
    }

    async #read(guildID) {
        let value;
        try {
            value = await this.#cache.getGuild(guildID);
        }
        catch(e) {
            log(`Failed to read cache for guildID=${guildID}, ${e}`, 'error');
        }

        //if cache read misses or fails
        if (!value) {
            try {
                value = await this.#dao.getGuild(guildID);
            }
            catch(e) {
                log(`Failed to read dao for guildID=${guildID}, ${e}`, 'error');
                throw new Error('Failed to read', {err: e});
            }
        }

        return value;
    }

    async #write(guild) {
        // write to db
        // if successful, invalidate cache
        // if not do nothing
        let successful = false;
        try {
            successful = await this.#dao.setGuild(guild);
        }
        catch(e) {
            log(`Failed to write to dao for guildID=${guild.guildID}, ${e}`, 'error');
            throw new Error('Failed to write', {err: e});
        }

        //if dao read succeeds
        if (successful) {
            const err = await this.#invalidateCache(guild.guildID);
            if (err) {
                throw new Error('Failed to write', {err});
            }
        }

    }

    async #invalidateCache(guildID, attempt = 1) {
        try {
            await this.#cache.invalidateCache(guildID);
        }
        catch(e) {
            log(`Failed to invalidate cache for guildID=${guildID}, attempt ${attempt}/${invalidateRetryAttempts}, ${e}`, 'error');
            if (++attempt <= invalidateRetryAttempts) {
                return this.#invalidateCache(guildID, attempt);
            }
            else {
                return e;
            }
        }
    }

    async getPrefix(guildID) {
        const guild = await this.#read(guildID);
        return guild?.prefix;
    }

    async setPrefix(guildID, prefix) {
        const guild = this.#read(guildID);
        guild.prefix = prefix;
        return this.#write(guild);
    }

    // async getRigged(guildID) {
    //     return this.#read(this.#cache.getRigged, this.#dao.getRigged, guildID);
    // }

    // async setRigged(guildID, rigged) {
    //     return this.#write(this.#dao.setPrefix, guildID, rigged);
    // }

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

module.exports = GuildDataProvider;