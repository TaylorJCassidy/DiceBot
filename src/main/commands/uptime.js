module.exports = {
    name: 'uptime',
    run : function(msg,args) {
        let uptimeTimestamp = msg.client.uptime;
        let time = [];

        time[0] = Math.floor(uptimeTimestamp / 86400000);
        uptimeTimestamp %= 86400000;
        time[1] = Math.floor(uptimeTimestamp / 3600000);
        uptimeTimestamp %= 3600000;
        time[2] = Math.floor(uptimeTimestamp / 60000);
        uptimeTimestamp %= 60000;
        time[3] = Math.floor(uptimeTimestamp / 1000);

        let timeOut = time[0] + 'd ' + time[1] + 'h ' + time[2] + 'm ' + time[3] + 's';

        msg.reply(timeOut);
    }
};