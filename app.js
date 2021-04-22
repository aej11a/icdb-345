const Discord = require('discord.js')
require('dotenv').config()

//Add all command strings to supported-conversions and call these
const { commands } = require('./supported-conversions')

const { setup } = require('./setup')
const { sendTime, sendDate } = require('./send-time')
const { timeConversion } = require('./time-conversion')
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
        //function: listens for timeRegEx
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
            msg.channel.send(buildTimesResponse(resultTimes, user.timezone))
        }
    }
})

const buildTimesResponse = (resultTimes, originalTimezone) => {
    let timeResponse = `${resultTimes[originalTimezone]} in ${originalTimezone} corresponds to: `
    timeResponse += '\n'

    const entries = Object.entries(resultTimes)
    const filteredResults = entries.filter(
        ([timezone]) => timezone !== originalTimezone
    )

    filteredResults.forEach(
        ([timezone, time]) => (timeResponse += time + ' ' + timezone + '\n')
    )

    return timeResponse
}

// {
//     EST: "1:00",
//     PST: "10:00"
// }
// [
//     ["EST", "1:00"],
//     ["PST", "10:00"]
// ]
