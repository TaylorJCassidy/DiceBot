const rigStatus = require('../../main/commands/common/rigStatus.json');
const { constants } = require('node:os');

const mockReadFile = jest.fn();
const mockWriteFile = jest.fn();
const mockRm = jest.fn();
jest.mock('node:fs/promises', () => ({
    readFile: mockReadFile,
    writeFile: mockWriteFile,
    rm: mockRm
}));

jest.mock('../../main/utils/logger');

const mockGuildID = '12345678912345678';

const GuildJSONDAO = require('../../main/DAOs/GuildJSONDAO');

beforeEach(() => {
    jest.clearAllMocks();
});

it('should get a guild', async () => {
    const guildFromFile = {
        guildID: mockGuildID, 
        prefix: '#',
        rigged: rigStatus.NONE, 
        aliases: [
            ['value1', 'dice1'], 
            ['value2', 'dice2']
        ]
    };

    const guildToUse = {
        ...guildFromFile,
        aliases: new Map(guildFromFile.aliases)
    };
    
    mockReadFile.mockResolvedValue(JSON.stringify(guildFromFile));
    expect(await GuildJSONDAO.getGuild(mockGuildID)).toStrictEqual(guildToUse);
    expect(mockReadFile).toBeCalledWith(`./guildJSONs/${mockGuildID}.json`);
});

it('should fail to get a guild', async () => {   
    mockReadFile.mockRejectedValue(new Error());
    expect(await GuildJSONDAO.getGuild(mockGuildID)).toBe(null);
    expect(mockReadFile).toBeCalledWith(`./guildJSONs/${mockGuildID}.json`);
});

it('should return a new guild if guild doesnt exist', async () => {
    const shouldReturn = {
        guildID: mockGuildID, 
        prefix: '.', 
        rigged: rigStatus.NONE, 
        aliases: new Map()
    };

    mockReadFile.mockRejectedValue({errno: constants.errno.ENOENT});
    expect(await GuildJSONDAO.getGuild(mockGuildID)).toStrictEqual(shouldReturn);
    expect(mockReadFile).toBeCalledWith(`./guildJSONs/${mockGuildID}.json`);
});

it('should set a guild', async () => {
    const guildToWrite = {
        guildID: mockGuildID, 
        prefix: '#',
        rigged: rigStatus.NONE, 
        aliases: new Map([
            ['value1', 'dice1'], 
            ['value2', 'dice2']
        ])
    };

    const guildWritten = {
        guildID: mockGuildID, 
        prefix: '#',
        rigged: rigStatus.NONE, 
        aliases: [
            ['value1', 'dice1'], 
            ['value2', 'dice2']
        ]
    };

    mockWriteFile.mockResolvedValue();
    expect(await GuildJSONDAO.setGuild(guildToWrite)).toBe(true);
    expect(mockWriteFile).toBeCalledWith(`./guildJSONs/${mockGuildID}.json`, JSON.stringify(guildWritten));
});

it('should fail to set a guild', async () => {
    const guildToWrite = {
        guildID: mockGuildID, 
        prefix: '#',
        rigged: rigStatus.NONE, 
        aliases: new Map([
            ['value1', 'dice1'], 
            ['value2', 'dice2']
        ])
    };

    const guildWritten = {
        guildID: mockGuildID, 
        prefix: '#',
        rigged: rigStatus.NONE, 
        aliases: [
            ['value1', 'dice1'], 
            ['value2', 'dice2']
        ]
    };

    mockWriteFile.mockRejectedValue(new Error());
    expect(await GuildJSONDAO.setGuild(guildToWrite)).toBe(false);
    expect(mockWriteFile).toBeCalledWith(`./guildJSONs/${mockGuildID}.json`, JSON.stringify(guildWritten));
});


it('should delete a guild', async () => {
    mockRm.mockResolvedValue();
    expect(await GuildJSONDAO.deleteGuild(mockGuildID)).toBe(true);
    expect(mockRm).toBeCalledWith(`./guildJSONs/${mockGuildID}.json`);
});


it('should delete a guild', async () => {
    mockRm.mockRejectedValue(new Error());
    expect(await GuildJSONDAO.deleteGuild(mockGuildID)).toBe(false);
    expect(mockRm).toBeCalledWith(`./guildJSONs/${mockGuildID}.json`);
});
