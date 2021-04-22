const Discord = require('discord.js')
require('dotenv').config()

const { timezoneCodes, currencyCodes } = require('./supported-conversions')

const client = new Discord.Client()
client.on('ready', () => {
    console.log("The bot is connected to Yang's Gang!")
})
client.login(process.env.BOT_TOKEN)

function setup(msg) {
    //https://greenwichmeantime.com/time-zone/definition/
    //https://github.com/ac360/currency-codes-array-ISO4217
    const content = msg.content.slice(7).toUpperCase().trim().split(' ') //7 is length of '!setup '
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

client.on('message', (msg) => {
    //test function: call and response
    if (msg.content === 'Hello ICDB!') {
        msg.reply('Hi :)')
    }

    //test function: messages today's date formatted mm/dd/yyyy
    if (msg.content === '!date') {
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
    if (msg.content === '!time') {
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
        setup(msg)
    }
    //function: listens for any number of {x}{currencyCode}, messages a match, outputs converted currency
    const regex = new RegExp('\\d+')
    if (msg.content.match(regex)) {
        if (msg.author.bot) return
        console.log(msg.content.match(regex))
        console.log(msg.content.match(regex)[0])
        const matchedPhrase = msg.content.match(regex)
        const lastIndex = matchedPhrase.index + matchedPhrase[0].length
        console.log(msg.content.substring(matchedPhrase.index, lastIndex))
        for (var i = 0; i < currencyCodes.length; i++) {
            if (
                msg.content.substring(lastIndex, lastIndex + 3) ===
                currencyCodes[i]
            ) {
                msg.channel.send(
                    'Match found: ' + matchedPhrase + currencyCodes[i]
                )
                console.log({
                    value: Number(
                        msg.content.substring(matchedPhrase.index, lastIndex)
                    ),
                    currencyCode: currencyCodes[i],
                })
                return {
                    value: Number(
                        msg.content.substring(matchedPhrase.index, lastIndex)
                    ),
                    currencyCode: currencyCodes[i],
                }
            }
        }
    }
})
