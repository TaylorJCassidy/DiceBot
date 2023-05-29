const mockGetPrefix = jest.fn();
const mockSetPrefix = jest.fn();
const mockGetRigged = jest.fn();
const mockSetRigged = jest.fn();
const mockGetAliases = jest.fn();
const mockSetAlias = jest.fn();
const mockUpdateAlias = jest.fn();
const mockDeleteAlias = jest.fn();

const mockGuildCache = {
    cache: {
        getPrefix: mockGetPrefix,
        setPrefix: mockSetPrefix,
        getRigged: mockGetRigged,
        setRigged: mockSetRigged,
        getAliases: mockGetAliases,
        setAlias: mockSetAlias,
        updateAlias: mockUpdateAlias,
        deleteAlias: mockDeleteAlias
    },
    id: '12345678912345678',
    name: 'Testing Guild'
};

module.exports = {
    mockGuildCache,
    mockGetPrefix,
    mockSetPrefix,
    mockGetRigged,
    mockSetRigged,
    mockGetAliases,
    mockSetAlias,
    mockUpdateAlias,
    mockDeleteAlias
};