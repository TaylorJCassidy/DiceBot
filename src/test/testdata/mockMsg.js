const mockReply = jest.fn();
const mockGetPrefix = jest.fn();
const mockSetPrefix = jest.fn();
const mockGetRigged = jest.fn();
const mockSetRigged = jest.fn();
const mockHasPermission = jest.fn();
const mockSend = jest.fn();

const mockMsg = {
    reply: mockReply,
    client: {
        uptime: 654321,
        ws: {
            ping: 100
        }
    },
    guild: {
        cache: {
            getPrefix: mockGetPrefix,
            setPrefix: mockSetPrefix,
            getRigged: mockGetRigged,
            setRigged: mockSetRigged
        }
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
        toString: () => '<@123456789012345678>'
    }
};

module.exports = {mockMsg, mockReply, mockGetPrefix, mockSetPrefix, mockGetRigged, mockSetRigged, mockHasPermission, mockSend};