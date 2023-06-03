const path = require('path');
const fs = require('fs');
const logger = require('./logger');

const files = fs.readdirSync(path.resolve(__dirname, '../commands'));
const commands = new Map();
const log = logger('getCommands');

for (const file of files) {
    const command = require(`../commands/${file}`);
    commands.set(command.name, command);
    //if command has aliases, adds alias as a different key to same command object
    if (command.aliases !== undefined) {
        command.aliases.forEach(alias => {
            if (commands.get(alias)) {
                log(`Found clashing alias '${alias}'`, 'warn');
            }
            else {
                commands.set(alias, command);
            }
        });
    }
}

module.exports = commands;