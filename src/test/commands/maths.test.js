const {mockMsg, mockReply, mockGetPrefix} = require('../testdata/mockMsg');

const maths = require('../../main/commands/maths');

beforeEach(() => {
    jest.resetAllMocks();
});

describe('maths invalid', () => {
    it('should return error when no equation is given', () => {
        mockGetPrefix.mockReturnValue('PREFIX');
        maths.run(mockMsg, '');
        expect(mockReply).toBeCalledWith('Please supply an equation e.g. PREFIXmaths 2+2');
    });

    it('should return error when an invalid equation is given', () => {
        maths.run(mockMsg, 'invalid equation');
        expect(mockReply).toBeCalledWith('The equation can only contain the following operators: () - + * / ^ %');
    });
});

describe('maths equation', () => {
    it('should return 4 when passed 2+2', () => {
        maths.run(mockMsg, '2+2');
        expect(mockReply).toBeCalledWith('4');
    });

    it('should return 16 when passed 4*4', () => {
        maths.run(mockMsg, '4*4');
        expect(mockReply).toBeCalledWith('16');
    });

    it('should return 81 when passed 9^2', () => {
        maths.run(mockMsg, '9^2');
        expect(mockReply).toBeCalledWith('81');
    });

    it('should return 0 when passed (3*(3+2))%5', () => {
        maths.run(mockMsg, '(3*(3+2))%5');
        expect(mockReply).toBeCalledWith('0');
    });
});

describe('calc sanitation', () => {
    it('should return 4 when passed 2+2', () => {
        expect(maths.calc('2+2')).toBe('4');
    });

    it('should return 0.5 when passed 1/2', () => {
        expect(maths.calc('1/2')).toBe('0.5');
    });

    it('should return invalid when passed invalid values', () => {
        expect(maths.calc('2+2d')).toBe('Invalid equation');
        expect(maths.calc('2++2')).toBe('Invalid equation');
    });
});