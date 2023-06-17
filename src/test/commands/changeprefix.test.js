const {mockMsg, mockHasPermission} = require('../mocks/mockMsg');
const {mockOptions, mockGetPrefix, mockSetPrefix} = require('../mocks/mockOptions');
const changeprefix = require('../../main/commands/changeprefix');

beforeEach(() => {
    jest.resetAllMocks();
    mockGetPrefix.mockReturnValue('#');
});

describe('changeprefix invalid', () => {
    it('should return an invalid permissions message', () => {
        mockHasPermission.mockReturnValue(false);
        
        expect(changeprefix.run(mockMsg, '', mockOptions)).toBe(`You must have the 'Administrator' permission to perform this action.`);
    });

    it('should return an invalid arguements message when given no arguement', () => {
        mockHasPermission.mockReturnValue(true);
        
        expect(changeprefix.run(mockMsg, '', mockOptions)).toBe('Please supply a prefix e.g. #changeprefix /');
    });

    it('should return an invalid arguements message when given an invalid arguement', () => {
        mockHasPermission.mockReturnValue(true);

        expect(changeprefix.run(mockMsg, '~', mockOptions)).toBe('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');
        expect(changeprefix.run(mockMsg, '^', mockOptions)).toBe('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');
        expect(changeprefix.run(mockMsg, '\\', mockOptions)).toBe('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');
        expect(changeprefix.run(mockMsg, '\'', mockOptions)).toBe('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');
        expect(changeprefix.run(mockMsg, 'abcd', mockOptions)).toBe('Prefix cannot be more than two characters and cannot be any of the following: ^ ~ \\ \'');
    });

    it('should return an invalid arguements message when given prefix is the same', () => {
        mockHasPermission.mockReturnValue(true);

        expect(changeprefix.run(mockMsg, '#', mockOptions)).toBe('Prefix is already \'#\'.');
    });
});

describe('changeprefix valid', () => {
    it('should change the server prefix', () => {
        mockHasPermission.mockReturnValue(true);
        mockSetPrefix.mockReturnValue(true);

        expect(changeprefix.run(mockMsg, '.', mockOptions)).toBe('The prefix has been changed to \'#\'.');
        expect(mockSetPrefix).toBeCalledWith('.');
    });

    it('should fail to change the server prefix', () => {
        mockHasPermission.mockReturnValue(true);
        mockSetPrefix.mockReturnValue(false);

        expect(changeprefix.run(mockMsg, '.', mockOptions)).toBe('There has been an error. Please try again.');
        expect(mockSetPrefix).toBeCalledWith('.');
    });
});