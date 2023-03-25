const uptime = require('../../main/commands/uptime');
const {mockMsg, mockReply} = require('../testdata/mockMsg');

describe('uptime', () => {
    it('should return a formatted uptime', () => {
        uptime.run(mockMsg, null);
        expect(mockReply).toBeCalledWith('0d 0h 10m 54s');
    });
});