const {mockMsg} = require('../mocks/mockMsg');
const {mockOptions, mockGetPrefix} = require('../mocks/mockOptions');

const mockHelpEmbed = require('../mocks/mockHelpEmbed');

const getmod = require('../../main/commands/getmod');

beforeEach(() => {
    jest.resetAllMocks();
    mockGetPrefix.mockReturnValue('#');
});

describe('getmod invalid', () => {
    it('should return a help message', () => {
        getmod.run(mockMsg, '', mockOptions);

        expect(mockHelpEmbed).toBeCalledWith(expect.any(String), 'Getmod Info');
    });

    it('should return an error message on a non whole number', () => {
        expect(getmod.run(mockMsg, '10.1', mockOptions)).toBe('The number provided is not a positive whole number, or is too large.');
    });

    
    it('should return an error message on a negative number', () => {
        expect(getmod.run(mockMsg, '-1', mockOptions)).toBe('The number provided is not a positive whole number, or is too large.');
    });
});

describe('getmod number', () => {
    it('should return +5 when given 20', () => {
        expect(getmod.run(mockMsg, '20', mockOptions)).toBe('+5');
    });

    it('should return +0 when given 10', () => {
        expect(getmod.run(mockMsg, '10', mockOptions)).toBe('+0');
    });

    it('should return -1 when given 8', () => {
        expect(getmod.run(mockMsg, '8', mockOptions)).toBe('-1');
    });
});