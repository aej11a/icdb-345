const { timezoneCodes } = require('./supported-conversions')

//defaulted targetTimezone for debug purposes
function timeConversion(msg, targetTimezone = 'GMT') {
    if (msg.author.bot) {
        return
    }

    const content = msg.content.split(' ')
    const time = content[0].split(':')
    let amOrPm = content[1]

    const userTimezone = 'EST' //Replace with user's timezone from db

    time[0] = parseInt(time[0])

    //Conditional const's
    const validTime =
        time[0] > 0 &&
        time[0] <= 12 &&
        parseInt(time[1]) >= 0 &&
        parseInt(time[1]) < 60 &&
        time[1].length === 2
    const isAmOrPm = content[1] === 'am' || content[1] === 'pm'
    const timezoneFound = timezoneCodes.includes(targetTimezone)

    let convertedTime = time[0]

    if (timezoneFound && isAmOrPm && validTime) {
        //Uses indeces of timezone array
        const offset1 = timezoneCodes.indexOf(userTimezone)
        let offset2 = timezoneCodes.indexOf(targetTimezone)
        let diff = offset2 - offset1

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
            userTimezone + ' time: ' + content[0] + ' ' + content[1]
        )
        msg.channel.send(
            targetTimezone +
                ' time: ' +
                convertedTime +
                ':' +
                time[1] +
                ' ' +
                amOrPm
        )
    }

    if (!timezoneFound) {
        msg.channel.send('Your first timezone is unavailable or nonexistent!')
    }
    /*
    if (!timezoneCodes.includes(conversion[1])) {
        msg.channel.send('Your second timezone is unavailable or nonexistent!')
    }
    */
    if (!validTime) {
        msg.channel.send('Please use correct time format (eg. 4:20 or 04:20).')
    }
    if (!isAmOrPm) {
        msg.channel.send('Please use am or pm following your time.')
    }
    return {
        userId: msg.member.user.tag,
        channelId: msg.channel.id,
        convertedTime: convertedTime + ':' + time[1] + ' ' + amOrPm,
    }
}

module.exports = { timeConversion }
