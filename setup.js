const {
    currencyCodes,
    timezoneCodes,
    commands,
} = require('./supported-conversions')
module.exports = {
    setup: (msg) => {
        //https://greenwichmeantime.com/time-zone/definition/
        //https://github.com/ac360/currency-codes-array-ISO4217
        const content = msg.content
            .slice(commands.setup.length)
            .toUpperCase()
            .trim()
            .split(' ')
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
            msg.channel.send(
                'We could not find your timezone or your currency.'
            )
            return undefined
        }
        return {
            userId: msg.member.user.tag,
            channelId: msg.channel.id,
            timezone: timezone,
            currency: currency,
        }
    },
}
