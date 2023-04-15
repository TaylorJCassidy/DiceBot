const rigStatus = require('../../main/utils/rigStatus.json');
const {mockMsg, mockReply, mockGetPrefix, mockGetRigged, mockSetRigged, mockHasPermission, mockSend} = require('../testdata/mockMsg');

const mockHelpEmbed = jest.fn();
jest.mock('../../main/utils/helpEmbed', () => mockHelpEmbed);

const rig = require('../../main/commands/rig');

beforeEach(() => {
    jest.resetAllMocks();
});

describe('rig invalid', () => {
    it('should return invalid format error message', () => {
        mockGetPrefix.mockReturnValue('PREFIX');
        
        rig.run(mockMsg, 'arg1 arg2');
        expect(mockReply).toBeCalledWith('Invalid format PREFIXrig high/low/status/toggle');

        rig.run(mockMsg, '');
        expect(mockReply).toBeCalledWith('Invalid format PREFIXrig high/low/status/toggle');

        rig.run(mockMsg, 'invalidarg');
        expect(mockReply).toBeCalledWith('Invalid format PREFIXrig high/low/status/toggle');
    });    
});

describe('rig help', () => {
    it('should return a help message', () => {
        mockGetPrefix.mockReturnValue('PREFIX');

        rig.run(mockMsg, 'help');
        expect(mockHelpEmbed).toBeCalledWith(expect.any(String), 'Rig Info');
    });
});

describe('rig high', () => {
    it('should rig the dice high', () => {
        mockGetRigged.mockReturnValue(rigStatus.NONE);
        
        rig.run(mockMsg, 'high');
        expect(mockSetRigged).toBeCalledWith(rigStatus.HIGH);
        expect(mockReply).toBeCalledWith('Dice is now rigged for maximum.');
    });
    
    it('should unrig the dice if already set to high', () => {
        mockGetRigged.mockReturnValue(rigStatus.HIGH);
        
        rig.run(mockMsg, 'high');
        expect(mockSetRigged).toBeCalledWith(rigStatus.NONE);
        expect(mockReply).toBeCalledWith('Dice is no longer rigged.');
    });

    it('should not rig the dice high', () => {
        mockGetRigged.mockReturnValue(rigStatus.DISABLED);
        
        rig.run(mockMsg, 'high');
        expect(mockSetRigged).not.toBeCalled();
        expect(mockReply).toBeCalledWith('Dice cannot be rigged in this server.');
    });
});

describe('rig low', () => {
    it('should rig the dice low', () => {
        mockGetRigged.mockReturnValue(rigStatus.NONE);
        
        rig.run(mockMsg, 'low');
        expect(mockSetRigged).toBeCalledWith(rigStatus.LOW);
        expect(mockReply).toBeCalledWith('Dice is now rigged for minimum.');
    });
    
    it('should unrig the dice if already set to low', () => {
        mockGetRigged.mockReturnValue(rigStatus.LOW);
        
        rig.run(mockMsg, 'low');
        expect(mockSetRigged).toBeCalledWith(rigStatus.NONE);
        expect(mockReply).toBeCalledWith('Dice is no longer rigged.');
    });

    it('should not rig the dice low', () => {
        mockGetRigged.mockReturnValue(-1);
        
        rig.run(mockMsg, 'low');
        expect(mockSetRigged).not.toBeCalled();
        expect(mockReply).toBeCalledWith('Dice cannot be rigged in this server.');
    });
});

describe('rig status', () => {
    it('should return the disabled status message', () => {
        mockGetRigged.mockReturnValue(rigStatus.DISABLED);
        
        rig.run(mockMsg, 'status');
        expect(mockReply).toBeCalledWith('Dice cannot be rigged in this server.');
    });

    it('should return the high status message', () => {
        mockGetRigged.mockReturnValue(rigStatus.HIGH);
        
        rig.run(mockMsg, 'status');
        expect(mockReply).toBeCalledWith('The dice is rigged for maximum.');
    });

    it('should return the low status message', () => {
        mockGetRigged.mockReturnValue(rigStatus.LOW);
        
        rig.run(mockMsg, 'status');
        expect(mockReply).toBeCalledWith('The dice is rigged for minimum.');
    });

    it('should return the unrigged status message', () => {
        mockGetRigged.mockReturnValue(rigStatus.NONE);
        
        rig.run(mockMsg, 'status');
        expect(mockReply).toBeCalledWith('The dice is not rigged.');
    });
});

describe('rig toggle', () => {
    it('should enable whether the dice can be rigged', () => {
        mockHasPermission.mockReturnValue(true);
        mockGetRigged.mockReturnValue(rigStatus.DISABLED);
        
        rig.run(mockMsg, 'toggle');
        expect(mockSetRigged).toBeCalledWith(rigStatus.NONE);
        expect(mockReply).toBeCalledWith('The dice can now be rigged.');
    });

    it('should disable whether the dice can be rigged', () => {
        mockHasPermission.mockReturnValue(true);
        mockGetRigged.mockReturnValue(rigStatus.NONE);
        
        rig.run(mockMsg, 'toggle');
        expect(mockSetRigged).toBeCalledWith(rigStatus.DISABLED);
        expect(mockReply).toBeCalledWith('The dice can now no longer be rigged.');
    });

    it('should display an invalid permissions message', () => {
        mockHasPermission.mockReturnValue(false);

        rig.run(mockMsg, 'toggle');
        expect(mockReply).toBeCalledWith('You do not have the permission to do this action.');
    });
});