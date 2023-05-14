const path = require('path');
const fs = require('fs');

/**
 * Returns all the commands from the commands directory as a map
 * @returns {Map<String,Object>} The commands, with the command name and associated aliases as keys and command objects as values.
 */
module.exports = () => {
    const files = fs.readdirSync(path.resolve(__dirname, '../commands'));
    const commands = new Map();

    for (const file of files) {
        const command = require(`../commands/${file}`);
        commands.set(command.name, command);
        //if command has aliases, adds alias as a different key to same command object
        if (command.aliases !== undefined) {
            command.aliases.forEach(alias => {
                commands.set(alias, command);
            });
        }
    }
    return commands;
};