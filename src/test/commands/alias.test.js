const {mockMsg, mockHasPermission} = require('../mocks/mockMsg');
const {mockOptions, mockUpdateAlias, mockDeleteAlias, mockGetPrefix, mockGetAliases, mockSetAlias} = require('../mocks/mockOptions');

const mockHelpEmbed = jest.fn();
jest.mock('../../main/utils/helpEmbed', () => mockHelpEmbed);

const alias = require('../../main/commands/alias');

beforeEach(() => {
    jest.resetAllMocks();
    mockGetPrefix.mockReturnValue('#');
});

describe('alias invalid', () => {
    it('should return a help message when given no arguements', () => {
        alias.run(mockMsg, '', mockOptions);
        expect(mockHelpEmbed).toBeCalled();
    });

    it('should return a error message when given an invalid action arguement', () => {
        expect(alias.run(mockMsg, 'abcdefg', mockOptions)).toBe('There is no abcdefg command #alias help for help.');
    });
});

describe('alias add', () => {
    it('should return a error message when wrong number of secondary arguements are given', () => {
        expect(alias.run(mockMsg, 'add', mockOptions)).toBe('Invalid formatting #alias add <name> <dice>');
        expect(alias.run(mockMsg, 'add test', mockOptions)).toBe('Invalid formatting #alias add <name> <dice>');
    });

    it('should return a error message when trying to add an invalid dice', () => {
        expect(alias.run(mockMsg, 'add dice invaliddice', mockOptions)).toBe('The dice provided is an invalid dice roll. Please check the alias name has no spaces.');
    });

    it('should return a error message when trying to override an existing command', () => {
        expect(alias.run(mockMsg, 'add mockCommand d20', mockOptions)).toBe('Invalid name. The name provided overrides a command or a previous alias.');
    });

    it('should return a error message when trying to override an existing alias', () => {
        const mockAlias = new Map([
            ['mockalias', 'd20']
        ]);
        mockGetAliases.mockReturnValue(mockAlias);

        expect(alias.run(mockMsg, 'add mockAlias d20', mockOptions)).toBe('Invalid name. The name provided overrides a command or a previous alias.');
    });

    it('should successfully add an alias', () => {
        const mockAlias = new Map([
            ['mockalias', {}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockSetAlias.mockReturnValue(true);

        expect(alias.run(mockMsg, 'add newAlias d20', mockOptions)).toBe(`Alias 'newalias' has been added.`);
        expect(mockSetAlias).toBeCalledWith({guildID: '12345678912345678', userID: '12345678912345678', aliasName: 'newalias', dice: 'd20'});
    });

    it('should fail to add an alias', () => {
        const mockAlias = new Map([
            ['mockalias', {}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockSetAlias.mockReturnValue(false);

        expect(alias.run(mockMsg, 'add newAlias d20', mockOptions)).toBe(`There has been an error. Please try again.`);
        expect(mockSetAlias).toBeCalledWith({guildID: '12345678912345678', userID: '12345678912345678', aliasName: 'newalias', dice: 'd20'});
    });
});

describe('alias edit', () => {
    it('should return a error message when wrong number of secondary arguements are given', () => {
        expect(alias.run(mockMsg, 'edit', mockOptions)).toBe('Invalid formatting #alias edit <name> <dice>'); 
        expect(alias.run(mockMsg, 'edit test', mockOptions)).toBe('Invalid formatting #alias edit <name> <dice>');
    });

    it('should return a error message when trying to edit an invalid dice', () => {
        expect(alias.run(mockMsg, 'edit dice invaliddice', mockOptions)).toBe('The dice provided is an invalid dice roll. Please check the alias name has no spaces.');
    });

    it('should return a error message when trying to edit an alias that doesnt exist', () => {
        mockGetAliases.mockReturnValue(new Map());

        expect(alias.run(mockMsg, 'edit dice d20', mockOptions)).toBe('Invalid alias name. The alias provided does not exist.');
    });

    it('should return an error message when trying to edit an alias not created by the user', () => {
        const mockAlias = new Map([
            ['dice', {guildID: 'guildID', userID: 'invalidUserID', aliasName: 'dice', dice: 'd20'}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);

        expect(alias.run(mockMsg, 'edit dice d10', mockOptions)).toBe('You cannot modify an alias that was not created by you.');
        expect(mockUpdateAlias).not.toBeCalledWith({guildID: 'guildID', userID: 'invalidUserID', aliasName: 'dice', dice: 'd10'});
    });

    it('should successfully edit an alias previously created by the user', () => {
        const mockAlias = new Map([
            ['dice', {guildID: 'guildID', userID: '12345678912345678', aliasName: 'dice', dice: 'd20'}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);
        mockUpdateAlias.mockReturnValue(true);

        expect(alias.run(mockMsg, 'edit dice d10', mockOptions)).toBe(`Alias 'dice' has been edited.`);
        expect(mockUpdateAlias).toBeCalledWith({guildID: 'guildID', userID: '12345678912345678', aliasName: 'dice', dice: 'd10'});
    });

    it('should successfully edit an alias as an admin', () => {
        const mockAlias = new Map([
            ['dice', {guildID: 'guildID', userID: 'invalidUserID', aliasName: 'dice', dice: 'd20'}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(true);
        mockUpdateAlias.mockReturnValue(true);

        expect(alias.run(mockMsg, 'edit dice d10', mockOptions)).toBe(`Alias 'dice' has been edited.`);
        expect(mockUpdateAlias).toBeCalledWith({guildID: 'guildID', userID: 'invalidUserID', aliasName: 'dice', dice: 'd10'});
    });

    it('should fail to edit an alias', () => {
        const mockAlias = new Map([
            ['dice', {guildID: 'guildID', userID: '12345678912345678', aliasName: 'dice', dice: 'd20'}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);
        mockUpdateAlias.mockReturnValue(false);

        expect(alias.run(mockMsg, 'edit dice d10', mockOptions)).toBe(`There has been an error. Please try again.`);
        expect(mockUpdateAlias).toBeCalledWith({guildID: 'guildID', userID: '12345678912345678', aliasName: 'dice', dice: 'd10'});
    });
});

describe('alias remove', () => {
    it('should return a error message when wrong number of secondary arguements are given', () => {
        expect(alias.run(mockMsg, 'remove #', mockOptions)).toBe('Invalid name. The name provided includes invalid characters.');
    });

    it('should return an error when trying to remove an alias that doesnt exist', () => {
        mockGetAliases.mockReturnValue(new Map());

        expect(alias.run(mockMsg, 'remove dice', mockOptions)).toBe('Invalid alias name. The alias provided does not exist.');
    });

    it('should return an error when trying to remove an alias not created by the user', () => {
        const mockAlias = new Map([
            ['dice', {guildID: 'guildID', userID: 'invalidUserID', aliasName: 'dice', dice: 'd20'}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);

        expect(alias.run(mockMsg, 'remove dice', mockOptions)).toBe(`You cannot modify an alias that was not created by you.`);
        expect(mockDeleteAlias).not.toBeCalledWith('dice');
    });

    it('should successfully delete an alias previously created by the user', () => {
        const mockAlias = new Map([
            ['dice', {guildID: 'guildID', userID: '12345678912345678', aliasName: 'dice', dice: 'd20'}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);
        mockDeleteAlias.mockReturnValue(true);

        expect(alias.run(mockMsg, 'remove dice', mockOptions)).toBe(`Alias 'dice' has been removed.`);
        expect(mockDeleteAlias).toBeCalledWith('dice');
    });

    it('should successfully delete an alias as an admin', () => {
        const mockAlias = new Map([
            ['dice', {guildID: 'guildID', userID: 'invalidUserID', aliasName: 'dice', dice: 'd20'}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(true);
        mockDeleteAlias.mockReturnValue(true);

        expect(alias.run(mockMsg, 'remove dice', mockOptions)).toBe(`Alias 'dice' has been removed.`);
        expect(mockDeleteAlias).toBeCalledWith('dice');
    });

    it('should fail to delete an alias', () => {
        const mockAlias = new Map([
            ['dice', {guildID: 'guildID', userID: '12345678912345678', aliasName: 'dice', dice: 'd20'}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);
        mockDeleteAlias.mockReturnValue(false);

        expect(alias.run(mockMsg, 'remove dice', mockOptions)).toBe(`There has been an error. Please try again.`);
        expect(mockDeleteAlias).toBeCalledWith('dice');
    });
});

describe('alias list', () => {
    it('should print a empty aliases message', () => {
        mockGetAliases.mockReturnValue(new Map());

        expect(alias.run(mockMsg, 'list', mockOptions)).toBe('This server has no aliases.');
    });

    it('should print a sorted aliases list', () => {
        const mockAlias = new Map([
            ['dice', {guildID: 'guildID', userID: '12345678912345678', aliasName: 'dice', dice: 'd20'}],
            ['a', {guildID: 'guildID', userID: '12345678912345678', aliasName: 'a', dice: '3d100'}],
            ['alongaliasname', {guildID: 'guildID', userID: '12345678912345678', aliasName: 'alongaliasname', dice: '2d10+5'}]
        ]);

        mockGetAliases.mockReturnValue(mockAlias);

        const aliasList = 
            'a:               3d100\n' +
            'alongaliasname:  2d10+5\n' +
            'dice:            d20\n';

        alias.run(mockMsg, 'list', mockOptions);
        expect(mockHelpEmbed).toBeCalledWith(`Aliases in Testing Guild:\t\t\t\t\n\n${aliasList}`, 'Alias List');
    });
});