const {mockMsg, mockReply, mockGetPrefix} = require('../testdata/mockMsg');

const mockHelpEmbed = jest.fn();
jest.mock('../../main/utils/helpEmbed', () => mockHelpEmbed);

const alias = require('../../main/commands/alias');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('alias invalid', () => {
    it('should return a help message when given no arguements', () => {
        alias.run(mockMsg, '');
        expect(mockHelpEmbed).toBeCalled();
    });

    it('should return a error message when given an invalid action arguement', () => {
        mockGetPrefix.mockReturnValue('#');

        alias.run(mockMsg, 'abcdefg');
        expect(mockReply).toBeCalledWith('There is no abcdefg command #alias help for help.');
    });
});