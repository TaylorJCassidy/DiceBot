const mockReply = jest.fn();
const mockMsg = {
    reply: mockReply,
    client: {
        ws: {
            ping: 100
        }
    }
};

const mockEdit = jest.fn();

const ping = require('../../main/commands/ping');

describe('ping', () => {
    it('should return a list of latencies', async () => {
        jest.useFakeTimers();

        const mockReplyResolve = {
            edit: mockEdit
        };
        mockReply.mockReturnValue(
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(mockReplyResolve);
                }, 1000);
            })
        );

        const pingRun = ping.run(mockMsg, null);
        jest.runOnlyPendingTimers();
        await pingRun;

        expect(mockEdit).toBeCalledWith('Discord API response time: 100ms\nMessage response time: 1000ms');
    });
});