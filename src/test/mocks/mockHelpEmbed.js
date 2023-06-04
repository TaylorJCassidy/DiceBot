const mockHelpEmbed = jest.fn();
jest.mock('../../main/commands/common/extras', () => {
    return {
        ...jest.requireActual('../../main/commands/common/extras'),
        helpEmbed: mockHelpEmbed
    };
});

module.exports = mockHelpEmbed;