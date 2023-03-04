const uptime = require('../../main/commands/uptime');

const mockReply = jest.fn();
const mockMsg = {
    client: {
        uptime: 654321
    },
    reply: mockReply
};

it('should return a formatted uptime', () => {
    uptime.run(mockMsg, null);
    expect(mockReply).toBeCalledWith('0d 0h 10m 54s');
});