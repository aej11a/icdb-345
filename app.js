const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
client.on('ready', () => {
    console.log('The bot is connected to Yang\'s Gang!');
});
client.login(process.env.BOT_TOKEN)

client.on('message', (msg) => {
    if (msg.content === 'Hello ICDB!') msg.reply('Hi :)');

    if(msg.content === '!date') {
        const date = new Date();
        const content = 'Today\'s date is ' + date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + '.';
        msg.channel.send(content)
    }

    if(msg.content === '!time') {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let amOrPm = 'am';
        if(date.getHours() > 12) {
            hours = date.getHours() - 12;
            amOrPm = 'pm';
        }
        if(date.getMinutes() < 10){
            minutes = '0' + date.getMinutes();
        }
        if(date.getSeconds() < 10){
            seconds = '0' + date.getSeconds();
        }
        const content = 'The time is ' + hours + ':' + minutes + ':' + seconds + ' ' + amOrPm + '.';
        msg.channel.send(content)
    }
});