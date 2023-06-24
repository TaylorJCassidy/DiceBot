const {mockMsg} = require('../mocks/mockMsg');
const {mockOptions} = require('../mocks/mockOptions');

const mockHelpEmbed = require('../mocks/mockHelpEmbed');

const mockGetMod = jest.fn();
jest.mock('../../main/commands/common/getmod.js', () => mockGetMod);

const getmod = require('../../main/commands/getmod');

beforeEach(() => {
    jest.resetAllMocks();
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
        mockGetMod.mockReturnValue('+5');
        expect(getmod.run(mockMsg, '20', mockOptions)).toBe('+5');
    });
});