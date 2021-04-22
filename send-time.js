const sendTime = (msg) => {
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

const sendDate = (msg) => {
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

module.exports = {
    sendDate,
    sendTime,
}
