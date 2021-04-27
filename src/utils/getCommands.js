module.exports = {
    getCommands: () => {
        const fs = require('fs');
        const files = fs.readdirSync(`./src/commands`);
        const commands = new Map();

        for (const file of files) {
            const command = require(`../commands/${file}`);
            commands.set(command.name,command);
        }
        return commands;
    }
}