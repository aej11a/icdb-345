const { commands, timezoneCodes } = require('./supported-conversions')

function timeConversion(msg) {
    //Alter when DocBrown is no longer obsolete
    const content = msg.content
        .slice(commands.convertTime.length)
        .trim()
        .split(' ')
    const conversion = content[0].split('->')
    const time = content[1].split(':')
    time[0] = parseInt(time[0])
    const validTime =
        time[0] > 0 &&
        time[0] <= 12 &&
        parseInt(time[1]) >= 0 &&
        parseInt(time[1]) < 60 &&
        time[1].length === 2
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

module.exports = { timeConversion }
