const calc = require('../../../main/commands/common/calc');

describe('calc sanitation', () => {
    it('should return 4 when passed 2+2', () => {
        expect(calc('2+2')).toBe('4');
    });

    it('should return 0.5 when passed 1/2', () => {
        expect(calc('1/2')).toBe('0.5');
    });

    it('should return invalid when passed invalid values', () => {
        expect(calc('2+2d')).toBe('Invalid equation');
        expect(calc('2++2')).toBe('Invalid equation');
    });
});