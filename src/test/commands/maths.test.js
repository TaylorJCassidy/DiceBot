const {mockMsg} = require('../mocks/mockMsg');
const {mockOptions, mockGetPrefix} = require('../mocks/mockOptions');

const maths = require('../../main/commands/maths');

beforeEach(() => {
    jest.resetAllMocks();
});

describe('maths invalid', () => {
    it('should return error when no equation is given', () => {
        mockGetPrefix.mockReturnValue('#');
        expect(maths.run(mockMsg, '', mockOptions)).toBe('Please supply an equation e.g. #maths 2+2');
    });

    it('should return error when an invalid equation is given', () => {
        expect(maths.run(mockMsg, 'invalid equation', mockOptions)).toBe('The equation can only contain the following operators: () - + * / ^ %');
    });
});

describe('maths equation', () => {
    it('should return 4 when passed 2+2', () => {
        expect(maths.run(mockMsg, '2+2', mockOptions)).toBe('4');
    });

    it('should return 16 when passed 4*4', () => {
        expect(maths.run(mockMsg, '4*4', mockOptions)).toBe('16');
    });

    it('should return 81 when passed 9^2', () => {
        expect(maths.run(mockMsg, '9^2', mockOptions)).toBe('81');
    });

    it('should return 0 when passed (3*(3+2))%5', () => {
        expect(maths.run(mockMsg, '(3*(3+2))%5', mockOptions)).toBe('0');
    });
});