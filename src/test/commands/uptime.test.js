const {mockMsg} = require('../mocks/mockMsg');

const uptime = require('../../main/commands/uptime');

describe('uptime', () => {
    it('should return a formatted uptime', () => {
        expect(uptime.run(mockMsg)).toBe('0d 0h 10m 54s');
    });
});