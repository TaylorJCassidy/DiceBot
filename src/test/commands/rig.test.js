const rigStatus = require('../../main/commands/common/rigStatus.json');
const {mockMsg, mockHasPermission} = require('../mocks/mockMsg');
const {mockOptions, mockGetPrefix, mockGetRigged, mockSetRigged} = require('../mocks/mockOptions');

const mockHelpEmbed = require('../mocks/mockHelpEmbed');

const rig = require('../../main/commands/rig');

beforeEach(() => {
    jest.resetAllMocks();
});

describe('rig invalid', () => {
    it('should return invalid format error message', () => {
        mockGetPrefix.mockReturnValue('#');
        
        expect(rig.run(mockMsg, 'arg1 arg2', mockOptions)).toBe('Invalid format #rig high/low/status/toggle');
        
        expect(rig.run(mockMsg, '', mockOptions)).toBe('Invalid format #rig high/low/status/toggle');

        expect(rig.run(mockMsg, 'invalidarg', mockOptions)).toBe('Invalid format #rig high/low/status/toggle');
    });    
});

describe('rig help', () => {
    it('should return a help message', () => {
        mockGetPrefix.mockReturnValue('#');

        rig.run(mockMsg, 'help', mockOptions);
        expect(mockHelpEmbed).toBeCalledWith(expect.any(String), 'Rig Info');
    });
});


describe('rig high', () => {
    it('should rig the dice high', () => {
        mockGetRigged.mockReturnValue(rigStatus.NONE);
        
        expect(rig.run(mockMsg, 'high', mockOptions)).toBe('Dice is now rigged high.');
        expect(mockSetRigged).toBeCalledWith(rigStatus.HIGH);
    });
    
    it('should unrig the dice if already set to high', () => {
        mockGetRigged.mockReturnValue(rigStatus.HIGH);
        
        expect(rig.run(mockMsg, 'high', mockOptions)).toBe('Dice is no longer rigged.');
        expect(mockSetRigged).toBeCalledWith(rigStatus.NONE);
    });

    it('should not rig the dice high', () => {
        mockGetRigged.mockReturnValue(rigStatus.DISABLED);
        
        expect(rig.run(mockMsg, 'high', mockOptions)).toBe('Dice cannot be rigged in this server.');
        expect(mockSetRigged).not.toBeCalled();
    });
});

describe('rig low', () => {
    it('should rig the dice low', () => {
        mockGetRigged.mockReturnValue(rigStatus.NONE);

        expect(rig.run(mockMsg, 'low', mockOptions)).toBe('Dice is now rigged low.');
        expect(mockSetRigged).toBeCalledWith(rigStatus.LOW);
    });
    
    it('should unrig the dice if already set to low', () => {
        mockGetRigged.mockReturnValue(rigStatus.LOW);
        
        expect(rig.run(mockMsg, 'low', mockOptions)).toBe('Dice is no longer rigged.');
        expect(mockSetRigged).toBeCalledWith(rigStatus.NONE);
    });

    it('should not rig the dice low', () => {
        mockGetRigged.mockReturnValue(-1);
        
        expect(rig.run(mockMsg, 'low', mockOptions)).toBe('Dice cannot be rigged in this server.');
        expect(mockSetRigged).not.toBeCalled();
    });
});

describe('rig status', () => {
    it('should return the disabled status message', () => {
        mockGetRigged.mockReturnValue(rigStatus.DISABLED);

        expect(rig.run(mockMsg, 'status', mockOptions)).toBe('Dice cannot be rigged in this server.');
    });

    it('should return the high status message', () => {
        mockGetRigged.mockReturnValue(rigStatus.HIGH);

        expect(rig.run(mockMsg, 'status', mockOptions)).toBe('The dice is rigged high.');
    });

    it('should return the low status message', () => {
        mockGetRigged.mockReturnValue(rigStatus.LOW);
          
        expect(rig.run(mockMsg, 'status', mockOptions)).toBe('The dice is rigged low.');
    });

    it('should return the unrigged status message', () => {
        mockGetRigged.mockReturnValue(rigStatus.NONE);
        
        expect(rig.run(mockMsg, 'status', mockOptions)).toBe('The dice is not rigged.');
    });
});

describe('rig toggle', () => {
    it('should enable whether the dice can be rigged', () => {
        mockHasPermission.mockReturnValue(true);
        mockGetRigged.mockReturnValue(rigStatus.DISABLED);

        expect(rig.run(mockMsg, 'toggle', mockOptions)).toBe('The dice can now be rigged.');
        expect(mockSetRigged).toBeCalledWith(rigStatus.NONE);
    });

    it('should disable whether the dice can be rigged', () => {
        mockHasPermission.mockReturnValue(true);
        mockGetRigged.mockReturnValue(rigStatus.NONE);
        
        expect(rig.run(mockMsg, 'toggle', mockOptions)).toBe('The dice can now no longer be rigged.');
        expect(mockSetRigged).toBeCalledWith(rigStatus.DISABLED);
    });

    it('should display an invalid permissions message', () => {
        mockHasPermission.mockReturnValue(false);

        expect(rig.run(mockMsg, 'toggle', mockOptions)).toBe('You do not have the permission to do this action.');
    });
});