const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
client.on('ready', () => {
    console.log('The bot is connected to Yang\'s Gang!');
});
client.login(process.env.BOT_TOKEN)

client.on('message', (msg) => {
    if (msg.content === 'Hello ICDB!') msg.reply('Hi :)');

    if(msg.content == '!date') {
        let date = new Date();
        let content = 'Today\'s date is ' + date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + '.';
        msg.channel.send(content)
    }

    if(msg.content == '!time') {
        let date = new Date();
        var pm = false;
        var hours = date.getHours();
        var amOrPm = 'am';
        if(date.getHours() > 12) {
            pm = true;
            hours = date.getHours() - 12;
        }
        if(pm) {
            amOrPm = 'pm';
        }
        let content = 'The time is ' + hours + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + amOrPm + '.';
        msg.channel.send(content)
    }
});
