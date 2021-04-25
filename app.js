const Discord = require('discord.js')
require('dotenv').config()

//Add all command strings to supported-conversions and call these
const { commands } = require('./supported-conversions')

const { setup } = require('./setup')
const { sendTime, sendDate } = require('./send-time')
const { timeConversion } = require('./time-conversion')
const { autoParseCurrency } = require('./auto-parse-currency')
const { convertCurrency } = require('./currency')
const { addUserToDb, getUser, getChannel } = require('./db')

const client = new Discord.Client()
client.on('ready', () => {
    console.log("The bot is connected to Yang's Gang!")
})
client.login(process.env.BOT_TOKEN)

client.on('message', async (msg) => {
    if (msg.author.bot) {
        return
    }
    //test function: messages today's date formatted mm/dd/yyyy
    if (msg.content === commands.date) sendDate(msg)
    //test function: messages the current time formatted hh:mm:ss
    else if (msg.content === commands.time) sendTime(msg)
    else if (msg.content.startsWith('!whoami')) {
        const user = await getUser(msg)
        msg.channel.send(
            `You are ${user.userId}, your timezone is ${user.timezone}, and your currency is ${user.currency}.`
        )
    }

    //function: listens for !setup {timezone abbreviation} {currency abbreviation}, compares with list of acceptable values, messages confirmation, returns {userId, channelId, timezone, currency}
    else if (msg.content.startsWith('!setup')) {
        const messageSetupData = setup(msg)
        if (messageSetupData) addUserToDb(messageSetupData)
    } else {
        // for efficiency, don't fetch the user and channel twice,
        // so keep them cached if there is a time AND currency match in the same message
        //let cachedUser
        //let cachedChannel

        //function: listens for time mentions
        const timeRegEx = new RegExp(
            '((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))'
        )
        if (msg.content.match(timeRegEx)) {
            const user = await getUser(msg)
            const channel = await getChannel(msg)
            const resultTimes = {}
            channel.timezones.forEach(
                (targetTimezone) =>
                    (resultTimes[targetTimezone] = timeConversion(
                        msg,
                        user.timezone,
                        targetTimezone
                    ).convertedTime)
            )
            msg.channel.send(
                buildConversionResponse(resultTimes, user.timezone)
            )
            cachedUser = user
            cachedChannel = channel
        }

        // listen for currency mentions
        const currencyTest = autoParseCurrency(msg)
        if (currencyTest && currencyTest.currencyCode && currencyTest.value) {
            //const user = cachedUser || await getUser(msg)
            const channel = await getChannel(msg)
            const resultCurrencies = {}
            const promises = channel.currencies.map((targetCurrency) =>
                convertCurrency(
                    currencyTest.value,
                    currencyTest.currencyCode,
                    targetCurrency,
                    resultCurrencies
                )
            )
            await Promise.all(promises)
            msg.channel.send(
                buildConversionResponse(
                    resultCurrencies,
                    currencyTest.currencyCode
                )
            )
        }
    }
})

const buildConversionResponse = (conversionMap, keyOfOriginal) => {
    let timeResponse = `${conversionMap[keyOfOriginal]} in ${keyOfOriginal} corresponds to: `
    timeResponse += '\n'

    const entries = Object.entries(conversionMap)
    const filteredResults = entries.filter(([key]) => key !== keyOfOriginal)

    filteredResults.forEach(
        ([key, value]) => (timeResponse += value + ' ' + key + '\n')
    )

    return timeResponse
}
