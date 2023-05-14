module.exports = {
    name: 'ping',
    run: async (msg) => {
        const time = new Date();
        const msgReply = await msg.reply('Please wait...');
        msgReply.edit(`Discord API response time: ${msg.client.ws.ping}ms\nMessage response time: ${new Date() - time}ms`);
    }
};