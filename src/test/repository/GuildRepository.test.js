jest.mock('../../main/utils/logger');

const GuildRepository = require('../../main/repository/GuildRepository');

const mockGuildID = '12345678912345678';

beforeEach(() => {
    jest.clearAllMocks();
});

const mockDataProvider = {
    getPrefix: jest.fn(),
    setPrefix: jest.fn()
};

describe('get', () => {
    it('should return the guild prefix from the data provider', async () => {
        mockDataProvider.getPrefix.mockResolvedValue('#');
        const guildRepo = new GuildRepository(mockGuildID, mockDataProvider);

        expect(await guildRepo.getPrefix()).toBe('#');
        expect(mockDataProvider.getPrefix).toBeCalledWith(mockGuildID);
    });
});

describe('set', () => {
    it('should write the guild prefix to the data provider', async () => {
        mockDataProvider.setPrefix.mockResolvedValue(true);
        const guildRepo = new GuildRepository(mockGuildID, mockDataProvider);

        expect(await guildRepo.setPrefix('#')).toBe(true);
        expect(mockDataProvider.setPrefix).toBeCalledWith(mockGuildID, '#');
    });
});