//guildInfo
const mockGetPrefix = jest.fn();
const mockSetPrefix = jest.fn();
const mockGetRigged = jest.fn();
const mockSetRigged = jest.fn();
const mockGetAliases = jest.fn();
const mockSetAlias = jest.fn();
const mockUpdateAlias = jest.fn();
const mockDeleteAlias = jest.fn();

//commands
const mockCommand = jest.fn();

const mockOptions = {
    guildInfo: {
        getPrefix: mockGetPrefix,
        setPrefix: mockSetPrefix,
        getRigged: mockGetRigged,
        setRigged: mockSetRigged,
        getAliases: mockGetAliases,
        setAlias: mockSetAlias,
        updateAlias: mockUpdateAlias,
        deleteAlias: mockDeleteAlias
    },
    commands: new Map([
        ['mockcommand', {run: mockCommand}]
    ]),
    log: jest.fn()
};

module.exports = {
    mockOptions,

    //guildInfo
    mockGetPrefix,
    mockSetPrefix,
    mockGetRigged,
    mockSetRigged,
    mockGetAliases,
    mockSetAlias,
    mockUpdateAlias,
    mockDeleteAlias,

    //commands
    mockCommand
};