const getmod = require('../../../main/commands/common/getmod');

describe('getmod', () => {
    it('should return +5 when given 20', () => {
        expect(getmod('20')).toBe('+5');
    });

    it('should return +0 when given 10', () => {
        expect(getmod('10')).toBe('+0');
    });

    it('should return -1 when given 8', () => {
        expect(getmod('8')).toBe('-1');
    });
});