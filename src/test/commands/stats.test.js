const mockRandomNoGen = jest.fn();
jest.mock('../../main/utils/randomNoGen', () => mockRandomNoGen);

const mockGetMod = jest.fn();
jest.mock('../../main/commands/getmod', () => {
    return {
        getMod: mockGetMod
    };
});

const stats = require('../../main/commands/stats');
describe('stats', () => {
    it('should return a list of stats', () => {
        populateMocks(mockRandomNoGen, mockGetMod);
    
        expect(stats.run()).toBe('>>> ```7  -2\n7  -2\n7  -2\n13 +1\n13 +1\n13 +1\n```Total: 60');
    });
});

const populateMocks = (randomNoGen, getMod) => {
    randomNoGen.mockClear();
    for(let i=0; i<3; i++) {
        randomNoGen
            .mockReturnValueOnce(2)
            .mockReturnValueOnce(3)
            .mockReturnValueOnce(2)
            .mockReturnValueOnce(1);
        getMod.mockReturnValueOnce('-2');
    }
    for(let i=0; i<3; i++) {
        randomNoGen
            .mockReturnValueOnce(6)
            .mockReturnValueOnce(3)
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(1);
        getMod.mockReturnValueOnce('+1');
    }
};