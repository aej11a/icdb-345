const Discord = require('discord.js')
require('dotenv').config()

const { timezoneCodes, currencyCodes } = require('./supported-conversions')

//Add all command strings here and call these - may add to supported-conversions
const commands = {
    greeting: 'Hello ICDB!',
    date: '!date',
    time: '!time',
    convertTime: '!DocBrown',
    setup: '!setup',
}

const client = new Discord.Client()
client.on('ready', () => {
    console.log("The bot is connected to Yang's Gang!")
})
client.login(process.env.BOT_TOKEN)

function timeConversion(msg) {
    const content = msg.content
        .slice(commands.convertTime.length)
        .trim()
        .split(' ')
    const conversion = content[0].split('->')
    const time = content[1].split(':')
    time[0] = parseInt(time[0])
    const validTime =
        time[0] > 0 && time[0] <= 12 && time[1] >= 0 && time[1] < 60
    let amOrPm = content[2]
    const isAmOrPm = content[2] === 'am' || content[2] === 'pm'
    const timezoneFound =
        timezoneCodes.includes(conversion[0]) &&
        timezoneCodes.includes(conversion[1])
    let convertedTime = time[0]

    if (timezoneFound && isAmOrPm && validTime) {
        //Uses indeces of timezone array
        const offset1 = timezoneCodes.indexOf(conversion[0])
        const offset2 = timezoneCodes.indexOf(conversion[1])
        let diff = offset2 - offset1

        msg.channel.send(diff)

        while (diff < 0) {
            if (convertedTime === 12) {
                amOrPm = amOrPm === 'am' ? 'pm' : 'am'
            }
            convertedTime = convertedTime === 1 ? 12 : convertedTime - 1
            diff++
        }
        while (diff > 0) {
            convertedTime = convertedTime === 12 ? 1 : convertedTime + 1
            if (convertedTime === 12) {
                amOrPm = amOrPm === 'am' ? 'pm' : 'am'
            }
            diff--
        }
        msg.channel.send('Success!')
        msg.channel.send(
            conversion[0] + ' time: ' + content[1] + ' ' + content[2]
        )
        msg.channel.send(
            conversion[1] +
                ' time: ' +
                convertedTime +
                ':' +
                time[1] +
                ' ' +
                amOrPm
        )
    }
    if (!timezoneCodes.includes(conversion[0])) {
        msg.channel.send('Your first timezone is unavailable or nonexistent!')
    }
    if (!timezoneCodes.includes(conversion[1])) {
        msg.channel.send('Your second timezone is unavailable or nonexistent!')
    }
    if (!validTime) {
        msg.channel.send('Please use correct time format (eg. 4:20 or 04:20).')
    }
    if (!isAmOrPm) {
        msg.channel.send('Please use am or pm following your time.')
    }
    return {
        userId: msg.member.user.tag,
        channelId: msg.channel.id,
    }
}

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
    }
    if (timezoneFound) {
        msg.channel.send('Timezone: ' + timezone)
    } else {
        msg.channel.send('We could not find your timezone.')
    }
    if (currencyFound) {
        msg.channel.send('Currency: ' + currency)
    } else {
        msg.channel.send('We could not find your currency.')
    }
    return {
        userId: msg.member.user.tag,
        channelId: msg.channel.id,
        timezone: timezone,
        currency: currency,
    }
}

client.on('message', (msg) => {
    //test function: call and response
    if (msg.content === commands.greeting) {
        msg.reply('Hi :)')
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

    //function: listens for setup command {timezone abbreviation} {currency abbreviation}, compares with list of acceptable values, messages confirmation, returns {userId, channelId, timezone, currency}
    if (msg.content.startsWith(commands.setup)) {
        setup(msg)
    }

    //function: listens for convertTime command {starting timezone}->{ending timezone} {hh:mm} {'am' or 'pm'}
    if (msg.content.startsWith(commands.convertTime)) {
        timeConversion(msg)
    }
})
