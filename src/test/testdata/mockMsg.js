const mockReply = jest.fn();
const mockGetPrefix = jest.fn();
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
    }
};

module.exports = {mockMsg, mockReply, mockGetPrefix, mockGetRigged, mockSetRigged, mockHasPermission, mockSend};