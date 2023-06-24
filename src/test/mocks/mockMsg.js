const mockReply = jest.fn();
const mockHasPermission = jest.fn();

const mockMsg = {
    reply: mockReply,
    client: {
        uptime: 654321
    },
    guild: {
        id: '12345678912345678',
        name: 'Testing Guild'
    },
    member: {
        permissions: {
            has: mockHasPermission
        }
    },
    author: {
        id: '12345678912345678',
        toString: () => '<@123456789012345678>'
    }
};

module.exports = {
    mockMsg,
    mockReply,
    mockHasPermission
};