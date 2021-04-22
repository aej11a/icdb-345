const { currencyCodes } = require('./supported-conversions')
function autoParseCurrency(msg) {
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
    } else {
        return null
    }
}
