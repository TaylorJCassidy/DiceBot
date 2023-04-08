const {mockMsg, mockHasPermission, mockGetPrefix, mockReply, mockSetPrefix} = require('../testdata/mockMsg');
const changeprefix = require('../../main/commands/changeprefix');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('changeprefix invalid', () => {
    it('should return an invalid permissions message', () => {
        mockHasPermission.mockReturnValue(false);
        
        changeprefix.run(mockMsg, '');
        expect(mockReply).toBeCalledWith('You do not have the permission to do this action.');
    });

    it('should return an invalid arguements message when given no arguement', () => {
        mockHasPermission.mockReturnValue(true);
        mockGetPrefix.mockReturnValue('PREFIX');

        changeprefix.run(mockMsg, '');
        expect(mockReply).toBeCalledWith('Please supply a prefix e.g. PREFIXchangeprefix /');
    });

    it('should return an invalid arguements message when given an invalid arguement', () => {
        mockHasPermission.mockReturnValue(true);
        mockGetPrefix.mockReturnValue('PREFIX');

        changeprefix.run(mockMsg, '~');
        expect(mockReply).toBeCalledWith('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');

        changeprefix.run(mockMsg, '^');
        expect(mockReply).toBeCalledWith('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');

        changeprefix.run(mockMsg, '\\');
        expect(mockReply).toBeCalledWith('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');

        changeprefix.run(mockMsg, '\'');
        expect(mockReply).toBeCalledWith('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');
    });

    it('should return an invalid arguements message when given prefix is the same', () => {
        mockHasPermission.mockReturnValue(true);
        mockGetPrefix.mockReturnValue('a');

        changeprefix.run(mockMsg, 'a');
        expect(mockReply).toBeCalledWith('Prefix is already \'a\'.');
    });
});

describe('changeprefix valid', (() => {
    it('should change the server prefix', () => {
        mockHasPermission.mockReturnValue(true);
        mockGetPrefix.mockReturnValue('#');
        mockSetPrefix.mockReturnValue(true);

        changeprefix.run(mockMsg, '.');
        expect(mockSetPrefix).toBeCalledWith('.');
        expect(mockReply).toBeCalledWith('The prefix has been changed to \'#\'.');
    });

    it('should fail to change the server prefix', () => {
        mockHasPermission.mockReturnValue(true);
        mockGetPrefix.mockReturnValue('#');
        mockSetPrefix.mockReturnValue(false);

        changeprefix.run(mockMsg, '.');
        expect(mockSetPrefix).toBeCalledWith('.');
        expect(mockReply).toBeCalledWith('There has been an error. Please try again.');
    });
}));