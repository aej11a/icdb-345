const Discord = require('discord.js')
require('dotenv').config()

//Add all command strings to supported-conversions and call these
const {
    timezoneCodes,
    currencyCodes,
    commands,
    hello,
} = require('./supported-conversions')

const { timeConversion } = require('./timeConversion')
const { getUserFromMessage, addUserToDb } = require('./db')

const client = new Discord.Client()
client.on('ready', () => {
    console.log("The bot is connected to Yang's Gang!")
})
client.login(process.env.BOT_TOKEN)

function setup(msg) {
    //https://greenwichmeantime.com/time-zone/definition/
    //https://github.com/ac360/currency-codes-array-ISO4217
    const content = msg.content
        .slice(commands.setup.length)
        .toUpperCase()
        .trim()
        .split(' ') //7 is length of '!setup '
    const timezone = content[0]
    const currency = content[1]
    const timezoneFound = timezoneCodes.includes(timezone)
    const currencyFound = currencyCodes.includes(currency)
    if (timezoneFound && currencyFound) {
        msg.channel.send('Successful match for both timezone and currency!')
        msg.channel.send('User: ' + msg.member.user.tag)
        msg.channel.send('Timezone: ' + timezone)
        msg.channel.send('Currency: ' + currency)
        //msg.channel.send('Channel: ' + msg.channel.id);
        // above line for debugging not for display*
    } else if (timezoneFound && !currencyFound) {
        msg.channel.send(
            'Successful match for timezone, but we could not find your currency.'
        )
        msg.channel.send('Timezone: ' + timezone)
        msg.channel.send('Currency: ???')
        return undefined
    } else if (!timezoneFound && currencyFound) {
        msg.channel.send(
            'Successful match for currency, but we could not find your timezone.'
        )
        msg.channel.send('Timezone: ???')
        msg.channel.send('Currency: ' + currency)
        return undefined
    } else {
        msg.channel.send('We could not find your timezone or your currency.')
        return undefined
    }
    return {
        userId: msg.member.user.tag,
        channelId: msg.channel.id,
        timezone: timezone,
        currency: currency,
    }
}

client.on('message', async (msg) => {
    //test function: call and response
    if (msg.content === commands.greeting) {
        let rand = Math.floor(Math.random() * hello.length)
        msg.reply(hello[rand])
    }

    //test function: messages today's date formatted mm/dd/yyyy
    if (msg.content === commands.date) {
        const date = new Date()
        const content =
            "Today's date is " +
            date.getMonth() +
            '/' +
            date.getDate() +
            '/' +
            date.getFullYear() +
            '.'
        msg.channel.send(content)
    }

    //test function: messages the current time formatted hh:mm:ss
    if (msg.content === commands.time) {
        const date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        let amOrPm = 'am'
        if (date.getHours() > 12) {
            hours = date.getHours() - 12
            amOrPm = 'pm'
        }
        if (date.getMinutes() < 10) {
            minutes = '0' + date.getMinutes()
        }
        if (date.getSeconds() < 10) {
            seconds = '0' + date.getSeconds()
        }
        const content =
            'The time is ' +
            hours +
            ':' +
            minutes +
            ':' +
            seconds +
            ' ' +
            amOrPm +
            '.'
        msg.channel.send(content)
    }

    //function: listens for !setup {timezone abbreviation} {currency abbreviation}, compares with list of acceptable values, messages confirmation, returns {userId, channelId, timezone, currency}
    if (msg.content.startsWith('!setup')) {
        const messageSetupData = setup(msg)
        addUserToDb(messageSetupData)
    }

    if (msg.content.startsWith('!whoami')) {
        const user = await getUserFromMessage(msg)
        msg.channel.send(
            `You are ${user.userId}, your timezone is ${user.timezone}, and your currency is ${user.currency}.`
        )
    }

    //INVALID - function: listens for convertTime command {starting timezone}->{ending timezone} {hh:mm} {'am' or 'pm'}
    //function: listens for timeRegEx
    const timeRegEx = new RegExp(
        '((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))'
    )
    if (msg.content.match(timeRegEx)) {
        timeConversion(msg)
    }
})
