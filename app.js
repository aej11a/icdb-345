const Discord = require('discord.js')
require('dotenv').config()
const firebase = require('firebase')
require('firebase/firestore')

firebase.initializeApp({
    apiKey: 'AIzaSyCc9Nq5_hO5k5B0NJh772x4M4KA3EcdoP4',
    authDomain: 'inter-com-bot.firebaseapp.com',
    projectId: 'inter-com-bot',
    storageBucket: 'inter-com-bot.appspot.com',
    messagingSenderId: '435931175067',
    appId: '1:435931175067:web:2672116d6d95e5f1424e3e',
})

const db = firebase.firestore()

const client = new Discord.Client()
client.on('ready', () => {
    console.log("The bot is connected to Yang's Gang!")
})
client.login(process.env.BOT_TOKEN)

function setup(msg) {
    //https://greenwichmeantime.com/time-zone/definition/
    //https://github.com/ac360/currency-codes-array-ISO4217
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

    const addUserToDb = ({ userId, channelId, timezone, currency }) => {
        // will be used to get the currency or timezone of the user who SENDS the message (translate FROM these)
        db.collection('users').doc(userId).set({
            userId,
            timezone,
            currency,
        })
        // will be used to get the currencies or timezones of the rest of the channel (translate TO these)
        db.collection('channels')
            .doc(channelId)
            .set({
                channelId,
                timezones: firebase.firestore.FieldValue.arrayUnion(timezone),
                currencies: firebase.firestore.FieldValue.arrayUnion(currency),
            })
    }

    //function: listens for !setup {timezone abbreviation} {currency abbreviation}, compares with list of acceptable values, messages confirmation, returns {userId, channelId, timezone, currency}
    if (msg.content.startsWith('!setup')) {
        const messageSetupData = setup(msg)
        addUserToDb(messageSetupData)
    }
})
