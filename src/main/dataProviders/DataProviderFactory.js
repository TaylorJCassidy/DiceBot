const DAOFactory = require("../DAOs/DAOFactory");
const CacheFactory = require("../caches/CacheFactory");
const GuildDataProvider = require("./GuildDataProvider");

const dao = DAOFactory();
const cache = CacheFactory();

module.exports = () => {
    return new GuildDataProvider(dao, cache);
};