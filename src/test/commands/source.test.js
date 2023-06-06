const source = require('../../main/commands/source');

describe('source', () => {
    it('should return the source information', () => {
        expect(source.run()).toBe('All of DiceBot\'s source code can be found here: https://github.com/TaylorJCassidy/DiceBot');
    });
});