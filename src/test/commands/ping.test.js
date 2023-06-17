const {mockMsg, mockReply} = require('../mocks/mockMsg');

const mockEdit = jest.fn();

const pingCommand = require('../../main/commands/ping');

describe('ping', () => {
    it('should return a list of latencies', (done) => {
        jest.useFakeTimers();
        const time = 1000;
        const ping = 100;

        const mockReplyResolve = {
            edit: (value) => {
                mockEdit(value);
                expect(mockEdit).toBeCalledWith(`Discord API response time: ${ping}ms\nMessage response time: ${time}ms`);
                done();
            },
            client: {
                ws: {
                    ping
                }
            }
        };
        mockReply.mockReturnValue(
            new Promise((resolve) => {
                setTimeout(() => { 
                    resolve(mockReplyResolve);
                }, time);
            })
        );

        pingCommand.run(mockMsg);
        jest.runAllTimers();
    });
});