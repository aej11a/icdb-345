const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client()
client.on('ready', () => {
    console.log("The bot is connected to Yang's Gang!")
})
client.login(process.env.BOT_TOKEN)

const timezoneCodes = [
    'IDLW',
    'NT',
    'HST',
    'AKST',
    'PST',
    'MST',
    'CST',
    'EST',
    'AST',
    'ART',
    'AT',
    'WAT',
    'GMT',
    'CET',
    'EET',
    'MSK',
    'AMT',
    'PKT',
    'OMSK',
    'KRAT',
    'CST',
    'JST',
    'AEST',
    'SAKT',
    'NZST',
]

function timeConversion(msg) {
    const content = msg.content.slice(10).toUpperCase().trim().split(' ') //10 is the length of '!DocBrown '
    const conversion = content[0].split('->')
    const time = content[1].split(':').map(function (x) {
        return parseInt(x)
    })
    const validTime =
        time[0] > 0 && time[0] <= 12 && time[1] >= 0 && time[1] < 60
    let amOrPm = content[2].toLowerCase()
    const isAmOrPm = content[2] === 'AM' || content[2] === 'PM'
    const timezoneFound =
        timezoneCodes.includes(conversion[0]) &&
        timezoneCodes.includes(conversion[1])
    let convertedTime

    if (timezoneFound && isAmOrPm && validTime) {
        //Uses GMT offset
        const offset1 = timezoneCodes.indexOf(conversion[0])
        const offset2 = timezoneCodes.indexOf(conversion[1])
        const diff = offset2 - offset1

        convertedTime = time[0] + diff
        if (convertedTime < 0) {
            convertedTime += 12
            amOrPm = content[2] === 'AM' ? 'pm' : 'am'
        } else if (convertedTime > 12) {
            convertedTime -= 12
            amOrPm = content[2] === 'AM' ? 'pm' : 'am'
        }

        msg.channel.send('Success!')
        msg.channel.send(
            conversion[0] +
                ' time: ' +
                content[1] +
                ' ' +
                content[2].toLowerCase()
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
        convertedTime,
    }
}

function setup(msg) {
    //https://greenwichmeantime.com/time-zone/definition/
    //https://github.com/ac360/currency-codes-array-ISO4217

    const currencyCodes = [
        'AED',
        'AFN',
        'ALL',
        'AMD',
        'ANG',
        'AOA',
        'ARS',
        'AUD',
        'AWG',
        'AZN',
        'BAM',
        'BBD',
        'BDT',
        'BGN',
        'BHD',
        'BIF',
        'BMD',
        'BND',
        'BOB',
        'BOV',
        'BRL',
        'BSD',
        'BTN',
        'BWP',
        'BYR',
        'BZD',
        'CAD',
        'CDF',
        'CHE',
        'CHF',
        'CHW',
        'CLF',
        'CLP',
        'CNY',
        'COP',
        'COU',
        'CRC',
        'CUC',
        'CUP',
        'CVE',
        'CZK',
        'DJF',
        'DKK',
        'DOP',
        'DZD',
        'EGP',
        'ERN',
        'ETB',
        'EUR',
        'FJD',
        'FKP',
        'GBP',
        'GEL',
        'GHS',
        'GIP',
        'GMD',
        'GNF',
        'GTQ',
        'GYD',
        'HKD',
        'HNL',
        'HRK',
        'HTG',
        'HUF',
        'IDR',
        'ILS',
        'INR',
        'IQD',
        'IRR',
        'ISK',
        'JMD',
        'JOD',
        'JPY',
        'KES',
        'KGS',
        'KHR',
        'KMF',
        'KPW',
        'KRW',
        'KWD',
        'KYD',
        'KZT',
        'LAK',
        'LBP',
        'LKR',
        'LRD',
        'LSL',
        'LTL',
        'LVL',
        'LYD',
        'MAD',
        'MDL',
        'MGA',
        'MKD',
        'MMK',
        'MNT',
        'MOP',
        'MRO',
        'MUR',
        'MVR',
        'MWK',
        'MXN',
        'MXV',
        'MYR',
        'MZN',
        'NAD',
        'NGN',
        'NIO',
        'NOK',
        'NPR',
        'NZD',
        'OMR',
        'PAB',
        'PEN',
        'PGK',
        'PHP',
        'PKR',
        'PLN',
        'PYG',
        'QAR',
        'RON',
        'RSD',
        'RUB',
        'RWF',
        'SAR',
        'SBD',
        'SCR',
        'SDG',
        'SEK',
        'SGD',
        'SHP',
        'SLL',
        'SOS',
        'SRD',
        'SSP',
        'STD',
        'SYP',
        'SZL',
        'THB',
        'TJS',
        'TMT',
        'TND',
        'TOP',
        'TRY',
        'TTD',
        'TWD',
        'TZS',
        'UAH',
        'UGX',
        'USD',
        'USN',
        'USS',
        'UYI',
        'UYU',
        'UZS',
        'VEF',
        'VND',
        'VUV',
        'WST',
        'XAF',
        'XAG',
        'XAU',
        'XBA',
        'XBB',
        'XBC',
        'XBD',
        'XCD',
        'XDR',
        'XFU',
        'XOF',
        'XPD',
        'XPF',
        'XPT',
        'XTS',
        'XXX',
        'YER',
        'ZAR',
        'ZMW',
    ]
    const content = msg.content.slice(7).toUpperCase().trim().split(' ') //7 is length of '!setup '
    const timezone = content[0]
    const currency = content[1]
    const timezoneFound = timezoneCodes.includes(timezone)
    const currencyFound = currencyCodes.includes(currency)
    if (timezoneFound && currencyFound) {
        msg.channel.send('Successful match for both timezone and currency!')
        msg.channel.send('User: ' + msg.member.user.tag)
        //msg.channel.send('Channel: ' + msg.channel.id); *this line for debugging not for display*
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

    if (msg.content.startsWith('!DocBrown')) {
        timeConversion(msg)
    }
})
