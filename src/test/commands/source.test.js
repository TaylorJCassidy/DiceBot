const mockReply = jest.fn();
const mockMsg = {
    reply: mockReply
};

jest.mock('../../main/app.json', () => {
    return {
        theme: {
            iconProvider: 'dicebot'
        }
    };
});

const source = require('../../main/commands/source');

describe('source', () => {
    it('should return the source information', () => {
        source.run(mockMsg, null);
        expect(mockReply).toBeCalledWith('All of DiceBot\'s source code can be found here: https://github.com/TaylorJCassidy/DiceBot. Icon is provided by dicebot');
    });
});