const mockReply = jest.fn();
const mockGetPrefix = jest.fn();
const mockSetPrefix = jest.fn();
const mockGetRigged = jest.fn();
const mockSetRigged = jest.fn();
const mockHasPermission = jest.fn();
const mockSend = jest.fn();
const mockCommand = jest.fn();
const mockGetAliases = jest.fn();
const mockSetAlias = jest.fn();
const mockUpdateAlias = jest.fn();
const mockDeleteAlias = jest.fn();

const mockMsg = {
    reply: mockReply,
    client: {
        uptime: 654321,
        // eslint-disable-next-line no-useless-escape
        diceRegex: new RegExp(/^((((\d{0,2}d\d{1,3})|-?\d{1,3}) *[\+\-\*\/] *)*(\d{0,2}d\d{1,3})( *[\+\-\*\/] *\d{1,3})*( *~ *(res|vul|a|d))*)$/,'i'),
        commands: new Map([
            ['mockcommand', {run: mockCommand}]
        ])
    },
    guild: {
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
    },
    member: {
        permissions: {
            has: mockHasPermission
        }
    },
    channel: {
        send: mockSend
    },
    author: {
        id: '12345678912345678',
        toString: () => '<@123456789012345678>'
    }
};

module.exports = {
    mockMsg,
    mockReply,
    mockGetPrefix,
    mockSetPrefix,
    mockGetRigged,
    mockSetRigged,
    mockHasPermission,
    mockSend,
    mockCommand,
    mockGetAliases,
    mockSetAlias,
    mockUpdateAlias,
    mockDeleteAlias
};