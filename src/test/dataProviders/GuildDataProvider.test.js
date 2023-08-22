const mockDAO = {
    getGuild: jest.fn(),
    setGuild: jest.fn(),
    deleteGuild: jest.fn()
};

const mockCache = {
    getGuild: jest.fn(),
    setGuild: jest.fn(),
    deleteGuild: jest.fn(),
    invalidateCache: jest.fn()
};

const rigStatus = require('../../main/commands/common/rigStatus.json');
const GuildDataProvider = require('../../main/dataProviders/GuildDataProvider');

const mockGuildID = '12345678912345678';
let guildDataProvider;

beforeEach(() => {
    jest.clearAllMocks();
    guildDataProvider = new GuildDataProvider(mockDAO, mockCache);
});

describe('read', () => {
    it('should return a value from the cache', async () => {
        const guild = {
            guildID: mockGuildID, 
            prefix: '#',
            rigged: rigStatus.NONE, 
            aliases: new Map([
                ['value1', 'dice1'], 
                ['value2', 'dice2']
            ])
        };

        mockCache.getGuild.mockResolvedValue(guild);

        expect(await guildDataProvider.getPrefix(mockGuildID)).toBe('#');
        expect(mockCache.getGuild).toBeCalledWith(mockGuildID);
        expect(mockDAO.getGuild).not.toBeCalled();
    });
    
    it('should return a value from the db if the cache fails', async () => {
        const guild = {
            guildID: mockGuildID, 
            prefix: '#',
            rigged: rigStatus.NONE, 
            aliases: new Map([
                ['value1', 'dice1'], 
                ['value2', 'dice2']
            ])
        };

        mockCache.getGuild.mockRejectedValue();
        mockDAO.getGuild.mockResolvedValue(guild);

        expect(await guildDataProvider.getPrefix(mockGuildID)).toBe('#');
        expect(mockCache.getGuild).toBeCalledWith(mockGuildID);
        expect(mockDAO.getGuild).toBeCalledWith(mockGuildID);
    });
    
    it('should return a value from the db if the cache misses', async () => {
        const guild = {
            guildID: mockGuildID, 
            prefix: '#',
            rigged: rigStatus.NONE, 
            aliases: new Map([
                ['value1', 'dice1'], 
                ['value2', 'dice2']
            ])
        };

        mockCache.getGuild.mockResolvedValue(null);
        mockDAO.getGuild.mockResolvedValue(guild);

        expect(await guildDataProvider.getPrefix(mockGuildID)).toBe('#');
        expect(mockCache.getGuild).toBeCalledWith(mockGuildID);
        expect(mockDAO.getGuild).toBeCalledWith(mockGuildID);
    });
    
    it('should throw error if both the db and cache fail', async () => {
        mockCache.getGuild.mockRejectedValue();
        mockDAO.getGuild.mockRejectedValue();

        await expect(guildDataProvider.getPrefix(mockGuildID)).rejects.toThrow('Failed to read');
        expect(mockCache.getGuild).toBeCalledWith(mockGuildID);
        expect(mockDAO.getGuild).toBeCalledWith(mockGuildID);
    });
});

describe('write', () => {
    it('should write the a value to the dao', async () => {
        const cachedGuild = {
            guildID: mockGuildID, 
            prefix: '!',
            rigged: rigStatus.NONE, 
            aliases: new Map([
                ['value1', 'dice1'], 
                ['value2', 'dice2']
            ])
        };

        const guildToWrite = {
            guildID: mockGuildID, 
            prefix: '#',
            rigged: rigStatus.NONE, 
            aliases: new Map([
                ['value1', 'dice1'], 
                ['value2', 'dice2']
            ])
        };

        mockCache.getGuild.mockResolvedValue(cachedGuild);
        mockDAO.setGuild.mockResolvedValue(true);

        expect(await guildDataProvider.setPrefix(mockGuildID, '#')).toBe(true);
        expect(mockDAO.setGuild).toBeCalledWith(guildToWrite);
        expect(mockCache.invalidateCache).toBeCalledWith(mockGuildID);
    });

    it('should not invalidate the cache if a value fails to write to the dao', async () => {

    });

    it('should return an error if the cache fails to invalidate', async () => {

    });
});
