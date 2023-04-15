const {mockMsg, mockReply, mockSend, mockGetRigged, mockGetPrefix} = require('../testdata/mockMsg');
const rigStatus = require('../../main/utils/rigStatus.json');

const mockHelpEmbed = jest.fn();
jest.mock('../../main/utils/helpEmbed', () => mockHelpEmbed);

const mockRandomNoGen = jest.fn();
jest.mock('../../main/utils/randomNoGen', () => mockRandomNoGen);

const dice = require('../../main/commands/dice');

beforeEach(() => {
    jest.resetAllMocks();
});

describe('dice help', () => {
    it('should return a help message', () => {
        mockGetPrefix.mockReturnValue('PREFIX');

        dice.run(mockMsg, null);
        expect(mockHelpEmbed).toBeCalledWith(expect.any(String), 'Dice Info');
    });
});

describe('rolling dice', () => {
    mockGetRigged.mockReturnValue(rigStatus.NONE);

    it('should return 20 when rolling d20', () => {
        mockRandomNoGen.mockReturnValue(20);

        dice.diceController(mockMsg, 'd20');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **20**\nYou rolled: __20__');
    });

    it('should return 1 when rolling d20', () => {  
        mockRandomNoGen.mockReturnValue(1);

        dice.diceController(mockMsg, 'd20');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **1**\nYou rolled: __1__');
    });


    it('should return 10 when rolling d20', () => {
        mockRandomNoGen.mockReturnValue(10);

        dice.diceController(mockMsg, 'd20');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **10**\nYou rolled: 10');
    });

    it('should return 15 when rolling d20+5', () => {
        mockRandomNoGen.mockReturnValue(10);

        dice.diceController(mockMsg, 'd20+5');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **15**\nYou rolled: 10');
    });

    it('should return 17 when rolling d20-3', () => {  
        mockRandomNoGen.mockReturnValue(20);

        dice.diceController(mockMsg, 'd20-3');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **17**\nYou rolled: __20__');
    });

    it('should return 87 when rolling d100', () => {
        mockRandomNoGen.mockReturnValue(87);

        dice.diceController(mockMsg, 'd100');
        expect(mockRandomNoGen).toBeCalledWith(100, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **87**\nYou rolled: 87');
    });

    it('should return 15 when rolling 3d8 +2- 1 + 3', () => {
        mockRandomNoGen.mockReturnValueOnce(3);
        mockRandomNoGen.mockReturnValueOnce(4);
        mockRandomNoGen.mockReturnValueOnce(4);

        dice.diceController(mockMsg, '3d8 +2- 1 + 3');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 8, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 8, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(3, 8, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **15**\nYou rolled: 3, 4, 4');
    });

    it('should return 20 when rolling d8+2+2d10', () => {
        mockRandomNoGen.mockReturnValueOnce(3);
        mockRandomNoGen.mockReturnValueOnce(7);
        mockRandomNoGen.mockReturnValueOnce(8);

        dice.diceController(mockMsg, 'd8+2+2d10');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 8, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 10, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(3, 10, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **20**\nYou rolled: 3, 7, 8');
    });
});

describe('rolling dice with args', () => {
    mockGetRigged.mockReturnValue(rigStatus.NONE);
    it('should return 20 when rolling d20 with an advantage', () => {
        mockRandomNoGen.mockReturnValueOnce(15);
        mockRandomNoGen.mockReturnValueOnce(20);

        dice.diceController(mockMsg, 'd20 ~a');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 20, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **20**\n1st Roll:   **15**\t15\n2nd Roll: **20**\t__20__');

        mockRandomNoGen.mockReturnValueOnce(20);
        mockRandomNoGen.mockReturnValueOnce(15);

        dice.diceController(mockMsg, 'd20 ~a');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 20, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **20**\n1st Roll:   **20**\t__20__\n2nd Roll: **15**\t15');
    });

    it('should return 15 when rolling d20 with an disadvantage', () => {
        mockRandomNoGen.mockReturnValueOnce(15);
        mockRandomNoGen.mockReturnValueOnce(20);

        dice.diceController(mockMsg, 'd20 ~d');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 20, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **15**\n1st Roll:   **15**\t15\n2nd Roll: **20**\t__20__');

        mockRandomNoGen.mockReturnValueOnce(20);
        mockRandomNoGen.mockReturnValueOnce(15);

        dice.diceController(mockMsg, 'd20 ~d');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 20, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **15**\n1st Roll:   **20**\t__20__\n2nd Roll: **15**\t15');
    });

    it('should return 9 when rolling d20 with a resistance', () => {
        mockRandomNoGen.mockReturnValueOnce(19);

        dice.diceController(mockMsg, 'd20 ~res');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **9**\nYou rolled: 19');
    });

    it('should return 38 when rolling d20 with a vulnerability', () => {
        mockRandomNoGen.mockReturnValueOnce(19);

        dice.diceController(mockMsg, 'd20 ~vul');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **38**\nYou rolled: 19');
    });
});

describe('rolling dice when rigged', () => {
    it('should return 20 when rolling a d20 when rigged high', () => {
        mockGetRigged.mockReturnValue(rigStatus.HIGH);

        dice.diceController(mockMsg, 'd20');
        expect(mockRandomNoGen).not.toBeCalled();
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **20**\nYou rolled: __20__');
    });

    it('should return 1 when rolling a d20 when rigged low', () => {
        mockGetRigged.mockReturnValue(rigStatus.LOW);

        dice.diceController(mockMsg, 'd20');
        expect(mockRandomNoGen).not.toBeCalled();
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **1**\nYou rolled: __1__');
    });

    it('should return a number when rolling a d20 when rigged is disabled', () => {
        mockGetRigged.mockReturnValue(rigStatus.DISABLED);
        mockRandomNoGen.mockReturnValueOnce(10);

        dice.diceController(mockMsg, 'd20');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
        expect(mockSend).toBeCalledWith('>>> <@123456789012345678>, **10**\nYou rolled: 10');
    });
});

describe('rolling invalid dice', () => {
    mockGetRigged.mockReturnValue(rigStatus.NONE);
    it('should return an error related to a zero or one sided dice', () => {
        dice.diceController(mockMsg, 'd0');
        expect(mockRandomNoGen).not.toBeCalled();
        expect(mockReply).toBeCalledWith('Cannot roll a zero or one sided dice.');

        dice.diceController(mockMsg, 'd1');
        expect(mockRandomNoGen).not.toBeCalled();
        expect(mockReply).toBeCalledWith('Cannot roll a zero or one sided dice.');
    });

    it('should return an error related to a result that is too large', () => {
        mockRandomNoGen.mockReturnValueOnce(10000);

        dice.diceController(mockMsg, '1000d10000');
        expect(mockRandomNoGen).toBeCalledTimes(1000);
        expect(mockRandomNoGen).toBeCalledWith(10000, 1);
        expect(mockReply).toBeCalledWith('Result is too large to display.');
    });
});