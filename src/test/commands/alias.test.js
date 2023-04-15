const {mockMsg, mockReply, mockGetPrefix, mockGetAliases, mockSetAlias, mockHasPermission, mockUpdateAlias, mockDeleteAlias} = require('../testdata/mockMsg');

const mockHelpEmbed = jest.fn();
jest.mock('../../main/utils/helpEmbed', () => mockHelpEmbed);

const alias = require('../../main/commands/alias');
const Alias = require('../../main/models/Alias');

beforeEach(() => {
    jest.resetAllMocks();
    mockGetPrefix.mockReturnValue('#');
});

describe('alias invalid', () => {
    it('should return a help message when given no arguements', () => {
        alias.run(mockMsg, '');
        expect(mockHelpEmbed).toBeCalled();
    });

    it('should return a error message when given an invalid action arguement', () => {
        alias.run(mockMsg, 'abcdefg');
        expect(mockReply).toBeCalledWith('There is no abcdefg command #alias help for help.');
    });
});

describe('alias add', () => {
    it('should return a error message when wrong number of secondary arguements are given', () => {
        alias.run(mockMsg, 'add');
        expect(mockReply).toBeCalledWith('Invalid formatting #alias add <name> <dice>');

        alias.run(mockMsg, 'add test');
        expect(mockReply).toBeCalledWith('Invalid formatting #alias add <name> <dice>');
    });

    it('should return a error message when trying to add an invalid dice', () => {
        alias.run(mockMsg, 'add dice invaliddice');
        expect(mockReply).toBeCalledWith('The dice provided is an invalid dice roll. Please check the alias name has no spaces.');
    });

    it('should return a error message when trying to override an existing command', () => {
        alias.run(mockMsg, 'add mockCommand d20');
        expect(mockReply).toBeCalledWith('Invalid name. The name provided overrides a command or a previous alias.');
    });

    it('should return a error message when trying to override an existing alias', () => {
        const mockAlias = new Map([
            ['mockalias', 'd20']
        ]);
        mockGetAliases.mockReturnValue(mockAlias);

        alias.run(mockMsg, 'add mockAlias d20');
        expect(mockReply).toBeCalledWith('Invalid name. The name provided overrides a command or a previous alias.');
    });

    it('should successfully add an alias', () => {
        const mockAlias = new Map([
            ['mockalias', {}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockSetAlias.mockReturnValue(true);

        alias.run(mockMsg, 'add newAlias d20');
        expect(mockReply).toBeCalledWith(`Alias 'newalias' has been added.`);
        expect(mockSetAlias).toBeCalledWith(new Alias('12345678912345678', '12345678912345678', 'newalias', 'd20'));
    });

    it('should fail to add an alias', () => {
        const mockAlias = new Map([
            ['mockalias', {}]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockSetAlias.mockReturnValue(false);

        alias.run(mockMsg, 'add newAlias d20');
        expect(mockReply).toBeCalledWith(`There has been an error. Please try again.`);
        expect(mockSetAlias).toBeCalledWith(new Alias('12345678912345678', '12345678912345678', 'newalias', 'd20'));
    });
});

describe('alias edit', () => {
    it('should return a error message when wrong number of secondary arguements are given', () => {
        alias.run(mockMsg, 'edit');
        expect(mockReply).toBeCalledWith('Invalid formatting #alias edit <name> <dice>');

        alias.run(mockMsg, 'edit test');
        expect(mockReply).toBeCalledWith('Invalid formatting #alias edit <name> <dice>');
    });

    it('should return a error message when trying to edit an invalid dice', () => {
        alias.run(mockMsg, 'edit dice invaliddice');
        expect(mockReply).toBeCalledWith('The dice provided is an invalid dice roll. Please check the alias name has no spaces.');
    });

    it('should return a error message when trying to edit an alias that doesnt exist', () => {
        mockGetAliases.mockReturnValue(new Map());

        alias.run(mockMsg, 'edit dice d20');
        expect(mockReply).toBeCalledWith('Invalid alias name. The alias provided does not exist.');
    });

    it('should return an error message when trying to edit an alias not created by the user', () => {
        const mockAlias = new Map([
            ['dice', new Alias('guildID', 'invalidUserID', 'dice', 'd20')]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);

        alias.run(mockMsg, 'edit dice d10');
        expect(mockReply).toBeCalledWith('You cannot edit an alias that was not created by you.');
        expect(mockUpdateAlias).not.toBeCalledWith(new Alias('guildID', 'invalidUserID', 'dice', 'd10'));
    });

    it('should successfully edit an alias previously created by the user', () => {
        const mockAlias = new Map([
            ['dice', new Alias('guildID', '12345678912345678', 'dice', 'd20')]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);
        mockUpdateAlias.mockReturnValue(true);

        alias.run(mockMsg, 'edit dice d10');
        expect(mockReply).toBeCalledWith(`Alias 'dice' has been edited.`);
        expect(mockUpdateAlias).toBeCalledWith(new Alias('guildID', '12345678912345678', 'dice', 'd10'));
    });

    it('should successfully edit an alias as an admin', () => {
        const mockAlias = new Map([
            ['dice', new Alias('guildID', 'invalidUserID', 'dice', 'd20')]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(true);
        mockUpdateAlias.mockReturnValue(true);

        alias.run(mockMsg, 'edit dice d10');
        expect(mockReply).toBeCalledWith(`Alias 'dice' has been edited.`);
        expect(mockUpdateAlias).toBeCalledWith(new Alias('guildID', 'invalidUserID', 'dice', 'd10'));
    });

    it('should fail to edit an alias', () => {
        const mockAlias = new Map([
            ['dice', new Alias('guildID', '12345678912345678', 'dice', 'd20')]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);
        mockUpdateAlias.mockReturnValue(false);

        alias.run(mockMsg, 'edit dice d10');
        expect(mockReply).toBeCalledWith(`There has been an error. Please try again.`);
        expect(mockUpdateAlias).toBeCalledWith(new Alias('guildID', '12345678912345678', 'dice', 'd10'));
    });
});

describe('alias remove', () => {
    it('should return a error message when wrong number of secondary arguements are given', () => {
        alias.run(mockMsg, 'remove #');
        expect(mockReply).toBeCalledWith('Invalid name. The name provided includes invalid characters.');
    });

    it('should return an error when trying to remove an alias that doesnt exist', () => {
        mockGetAliases.mockReturnValue(new Map());

        alias.run(mockMsg, 'remove dice');
        expect(mockReply).toBeCalledWith(`There is no 'dice' alias.`);
    });

    it('should return an error when trying to remove an alias not created by the user', () => {
        const mockAlias = new Map([
            ['dice', new Alias('guildID', 'invalidUserID', 'dice', 'd20')]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);

        alias.run(mockMsg, 'remove dice');
        expect(mockReply).toBeCalledWith(`You cannot remove an alias that was not created by you.`);
        expect(mockDeleteAlias).not.toBeCalledWith('dice');
    });

    it('should successfully delete an alias previously created by the user', () => {
        const mockAlias = new Map([
            ['dice', new Alias('guildID', '12345678912345678', 'dice', 'd20')]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);
        mockDeleteAlias.mockReturnValue(true);

        alias.run(mockMsg, 'remove dice');
        expect(mockReply).toBeCalledWith(`Alias 'dice' has been removed.`);
        expect(mockDeleteAlias).toBeCalledWith('dice');
    });

    it('should successfully delete an alias as an admin', () => {
        const mockAlias = new Map([
            ['dice', new Alias('guildID', 'invalidUserID', 'dice', 'd20')]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(true);
        mockDeleteAlias.mockReturnValue(true);

        alias.run(mockMsg, 'remove dice');
        expect(mockReply).toBeCalledWith(`Alias 'dice' has been removed.`);
        expect(mockDeleteAlias).toBeCalledWith('dice');
    });

    it('should fail to delete an alias', () => {
        const mockAlias = new Map([
            ['dice', new Alias('guildID', '12345678912345678', 'dice', 'd20')]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);
        mockHasPermission.mockReturnValue(false);
        mockDeleteAlias.mockReturnValue(false);

        alias.run(mockMsg, 'remove dice');
        expect(mockReply).toBeCalledWith(`There has been an error. Please try again.`);
        expect(mockDeleteAlias).toBeCalledWith('dice');
    });
});

describe('alias list', () => {
    it('should print a empty aliases message', () => {
        mockGetAliases.mockReturnValue(new Map());

        alias.run(mockMsg, 'list');
        expect(mockReply).toBeCalledWith('This server has no aliases.');
    });

    it('should print a sorted aliases list', () => {
        const mockAlias = new Map([
            ['dice', new Alias('guildID', '12345678912345678', 'dice', 'd20')],
            ['a', new Alias('guildID', '12345678912345678', 'a', '3d100')],
            ['alongaliasname', new Alias('guildID', '12345678912345678', 'alongaliasname', '2d10+5')]
        ]);
        mockGetAliases.mockReturnValue(mockAlias);

        const aliasList = 
            'a:               3d100\n' +
            'alongaliasname:  2d10+5\n' +
            'dice:            d20\n';

        alias.run(mockMsg, 'list');
        expect(mockHelpEmbed).toBeCalledWith(`Aliases in Testing Guild:\t\t\t\t\n\n${aliasList}`,'Alias List');
    });
});