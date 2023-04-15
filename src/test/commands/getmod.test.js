const {mockMsg, mockGetPrefix, mockReply} = require('../testdata/mockMsg');

const mockHelpEmbed = jest.fn();
jest.mock('../../main/utils/helpEmbed', () => mockHelpEmbed);

const getmod = require('../../main/commands/getmod');

beforeEach(() => {
    jest.resetAllMocks();
    mockGetPrefix.mockReturnValue('#');
});

describe('getmod invalid', () => {
    it('should return a help message', () => {
        getmod.run(mockMsg, '');

        expect(mockHelpEmbed).toBeCalledWith(expect.any(String), 'Getmod Info');
    });

    it('should return an error message on a non whole number', () => {
        getmod.run(mockMsg, '10.1');

        expect(mockReply).toBeCalledWith('The number provided is not a positive whole number, or is too large.');
    });

    
    it('should return an error message on a negative number', () => {
        getmod.run(mockMsg, '-1');

        expect(mockReply).toBeCalledWith('The number provided is not a positive whole number, or is too large.');
    });
});

describe('getmod number', () => {
    it('should return +5 when given 20', () => {
        getmod.run(mockMsg, '20');

        expect(mockReply).toBeCalledWith('+5');
    });

    it('should return +0 when given 10', () => {
        getmod.run(mockMsg, '10');

        expect(mockReply).toBeCalledWith('+0');
    });

    it('should return -1 when given 8', () => {
        getmod.run(mockMsg, '8');

        expect(mockReply).toBeCalledWith('-1');
    });
});