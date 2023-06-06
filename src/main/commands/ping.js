module.exports = {
    name: 'ping',
    run: (msg) => {
        const time = new Date();
        msg.reply('Please wait...').then((msgReply) => {
            msgReply.edit(`Discord API response time: ${msgReply.client.ws.ping}ms\nMessage response time: ${new Date() - time}ms`);
        });
    }
};