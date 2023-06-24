const {mockMsg} = require('../mocks/mockMsg');
const {mockOptions, mockGetRigged, mockGetPrefix} = require('../mocks/mockOptions');
const rigStatus = require('../../main/commands/common/rigStatus.json');

const mockHelpEmbed = require('../mocks/mockHelpEmbed');

const mockRandomNoGen = jest.fn();
jest.mock('../../main/utils/randomNoGen', () => mockRandomNoGen);

const dice = require('../../main/commands/dice');

beforeEach(() => {
    jest.resetAllMocks();
    mockGetRigged.mockReturnValue(rigStatus.NONE);
});

describe('dice help', () => {
    it('should return a help message', () => {
        mockGetPrefix.mockReturnValue('#');

        dice.run(mockMsg, null, mockOptions);
        expect(mockHelpEmbed).toBeCalledWith(expect.any(String), 'Dice Info');
    });
});

describe('rolling dice', () => {
    it('should return 20 when rolling d20', () => {
        mockRandomNoGen.mockReturnValue(20);

        expect(dice.diceController(mockMsg, 'd20', mockOptions)).toBe('>>> <@123456789012345678>, **20**\nYou rolled: __20__');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
    });

    it('should return 1 when rolling d20', () => {  
        mockRandomNoGen.mockReturnValue(1);

        expect(dice.diceController(mockMsg, 'd20', mockOptions)).toBe('>>> <@123456789012345678>, **1**\nYou rolled: __1__');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
    });


    it('should return 10 when rolling d20', () => {
        mockRandomNoGen.mockReturnValue(10);

        expect(dice.diceController(mockMsg, 'd20', mockOptions)).toBe('>>> <@123456789012345678>, **10**\nYou rolled: 10');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
    });

    it('should return 15 when rolling d20+5', () => {
        mockRandomNoGen.mockReturnValue(10);

        expect(dice.diceController(mockMsg, 'd20+5', mockOptions)).toBe('>>> <@123456789012345678>, **15**\nYou rolled: 10');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
    });

    it('should return 17 when rolling d20-3', () => {  
        mockRandomNoGen.mockReturnValue(20);

        expect(dice.diceController(mockMsg, 'd20-3', mockOptions)).toBe('>>> <@123456789012345678>, **17**\nYou rolled: __20__');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
    });

    it('should return 87 when rolling d100', () => {
        mockRandomNoGen.mockReturnValue(87);

        expect(dice.diceController(mockMsg, 'd100', mockOptions)).toBe('>>> <@123456789012345678>, **87**\nYou rolled: 87');
        expect(mockRandomNoGen).toBeCalledWith(100, 1);
    });

    it('should return 15 when rolling 3d8 +2- 1 + 3', () => {
        mockRandomNoGen.mockReturnValueOnce(3);
        mockRandomNoGen.mockReturnValueOnce(4);
        mockRandomNoGen.mockReturnValueOnce(4);

        expect(dice.diceController(mockMsg, '3d8 +2- 1 + 3', mockOptions)).toBe('>>> <@123456789012345678>, **15**\nYou rolled: 3, 4, 4');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 8, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 8, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(3, 8, 1);
    });

    it('should return 20 when rolling d8+2+2d10', () => {
        mockRandomNoGen.mockReturnValueOnce(3);
        mockRandomNoGen.mockReturnValueOnce(7);
        mockRandomNoGen.mockReturnValueOnce(8);

        expect(dice.diceController(mockMsg, 'd8+2+2d10', mockOptions)).toBe('>>> <@123456789012345678>, **20**\nYou rolled: 3, 7, 8');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 8, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 10, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(3, 10, 1);
    });
});

describe('rolling dice with args', () => {
    it('should return 20 when rolling d20 with an advantage', () => {
        mockRandomNoGen.mockReturnValueOnce(15);
        mockRandomNoGen.mockReturnValueOnce(20);

        expect(dice.diceController(mockMsg, 'd20 ~a', mockOptions)).toBe('>>> <@123456789012345678>, **20**\n1st Roll:   **15**\t15\n2nd Roll: **20**\t__20__');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 20, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 20, 1);

        mockRandomNoGen.mockReturnValueOnce(20);
        mockRandomNoGen.mockReturnValueOnce(15);

        expect(dice.diceController(mockMsg, 'd20 ~a', mockOptions)).toBe('>>> <@123456789012345678>, **20**\n1st Roll:   **20**\t__20__\n2nd Roll: **15**\t15');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 20, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 20, 1);
    });

    it('should return 15 when rolling d20 with an disadvantage', () => {
        mockRandomNoGen.mockReturnValueOnce(15);
        mockRandomNoGen.mockReturnValueOnce(20);

        expect(dice.diceController(mockMsg, 'd20 ~d', mockOptions)).toBe('>>> <@123456789012345678>, **15**\n1st Roll:   **15**\t15\n2nd Roll: **20**\t__20__');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 20, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 20, 1);

        mockRandomNoGen.mockReturnValueOnce(20);
        mockRandomNoGen.mockReturnValueOnce(15);

        expect(dice.diceController(mockMsg, 'd20 ~d', mockOptions)).toBe('>>> <@123456789012345678>, **15**\n1st Roll:   **20**\t__20__\n2nd Roll: **15**\t15');
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(1, 20, 1);
        expect(mockRandomNoGen).toHaveBeenNthCalledWith(2, 20, 1);
    });

    it('should return 9 when rolling d20 with a resistance', () => {
        mockRandomNoGen.mockReturnValueOnce(19);

        expect(dice.diceController(mockMsg, 'd20 ~res', mockOptions)).toBe('>>> <@123456789012345678>, **9**\nYou rolled: 19');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
    });

    it('should return 38 when rolling d20 with a vulnerability', () => {
        mockRandomNoGen.mockReturnValueOnce(19);

        expect(dice.diceController(mockMsg, 'd20 ~vul', mockOptions)).toBe('>>> <@123456789012345678>, **38**\nYou rolled: 19');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
    });
});

describe('rolling dice when rigged', () => {
    it('should return 20 when rolling a d20 when rigged high', () => {
        mockGetRigged.mockReturnValue(rigStatus.HIGH);

        expect(dice.diceController(mockMsg, 'd20', mockOptions)).toBe('>>> <@123456789012345678>, **20**\nYou rolled: __20__');
        expect(mockRandomNoGen).not.toBeCalled();
    });

    it('should return 1 when rolling a d20 when rigged low', () => {
        mockGetRigged.mockReturnValue(rigStatus.LOW);

        expect(dice.diceController(mockMsg, 'd20', mockOptions)).toBe('>>> <@123456789012345678>, **1**\nYou rolled: __1__');
        expect(mockRandomNoGen).not.toBeCalled();
    });

    it('should return a number when rolling a d20 when rigged is disabled', () => {
        mockGetRigged.mockReturnValue(rigStatus.DISABLED);
        mockRandomNoGen.mockReturnValueOnce(10);

        expect(dice.diceController(mockMsg, 'd20', mockOptions)).toBe('>>> <@123456789012345678>, **10**\nYou rolled: 10');
        expect(mockRandomNoGen).toBeCalledWith(20, 1);
    });
});

describe('rolling invalid dice', () => {
    it('should return an error related to a zero or one sided dice', () => {
        expect(dice.diceController(mockMsg, 'd0', mockOptions)).toBe('Cannot roll a zero or one sided dice.');
        expect(mockRandomNoGen).not.toBeCalled();

        expect(dice.diceController(mockMsg, 'd1', mockOptions)).toBe('Cannot roll a zero or one sided dice.');
        expect(mockRandomNoGen).not.toBeCalled();

        expect(dice.diceController(mockMsg, 'd10+d1', mockOptions)).toBe('Cannot roll a zero or one sided dice.');
        expect(mockRandomNoGen).not.toBeCalled();

        expect(dice.diceController(mockMsg, 'd0+10+d20', mockOptions)).toBe('Cannot roll a zero or one sided dice.');
        expect(mockRandomNoGen).not.toBeCalled();
    });

    it('should return an error related to a result that is too large', () => {
        mockRandomNoGen.mockReturnValueOnce(10000);

        expect(dice.diceController(mockMsg, '1000d10000', mockOptions)).toBe('Result is too large to display.');
        expect(mockRandomNoGen).toBeCalledTimes(1000);
        expect(mockRandomNoGen).toBeCalledWith(10000, 1);
    });
});