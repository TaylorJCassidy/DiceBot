const { readFile, writeFile, rm } = require( 'node:fs/promises');
const { constants } = require('node:os');
const rigStatus = require('../commands/common/rigStatus.json');
const logger = require('../utils/logger');
const log = logger('GuildJSONDAO');

const FILEPATH = './guildJSONs/';

module.exports = {
    getGuild: async (guildID) => {
        return readFile(`${FILEPATH}${guildID}.json`)
            .then((json) => {
                const guild = JSON.parse(json);
                return {...guild, aliases: new Map(guild.aliases)};
            })
            .catch((e) => {
                //if no file exists for guild
                if (e.errno == constants.errno.ENOENT) {
                    return {guildID, prefix: '.', rigged: rigStatus.NONE, aliases: new Map()};
                }
                else {
                    log(`Failed to parse guild JSON for guildID=${guildID}, ${e}`, 'error');
                    return null;
                }
            });
    },

    setGuild: async (guild) => {
        return writeFile(`${FILEPATH}${guild.guildID}.json`, JSON.stringify({...guild, aliases: Array.from(guild.aliases)}))
            .then(() => {
                return true;
            })
            .catch((e) => {
                log(`Failed to parse guild JSON for guildID=${guild.guildID}, ${e}`, 'error');
                return false;
            });
    },

    deleteGuild: async (guildID) => {
        return rm(`${FILEPATH}${guildID}.json`)
            .then(() => {
                return true;
            })
            .catch((e) => {
                log(`Failed to delete guild JSON for guildID=${guildID}, ${e}`, 'error');
                return false;
            });
    }
};