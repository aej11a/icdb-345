const fetch = require('node-fetch')

//function call format convertCurrency(currency amount(int), '[from Currency Code]', '[to Currency Code]', CB)
//cb format = function(error, value)
async function convertCurrency(
    amount,
    fromCurrency,
    toCurrency,
    resultCurrencies
) {
    fromCurrency = encodeURIComponent(fromCurrency)
    toCurrency = encodeURIComponent(toCurrency)
    const query = fromCurrency + '_' + toCurrency

    const url =
        'https://free.currconv.com/api/v7/convert?q=' +
        query +
        '&compact=ultra&apiKey=' +
        process.env.API_KEY

    return fetch(url)
        .then((res) => res.text())
        .then((body) => {
            const jsonObj = JSON.parse(body)
            const conversionRate = jsonObj[query]
            resultCurrencies[toCurrency] =
                Math.round(conversionRate * amount * 100) / 100
        })
}

module.exports = { convertCurrency }

/** 

test #1

convertCurrency(10, 'EUR', 'JPY', function (err, amount) {
    console.log(amount)
})

//test #2
convertCurrency(10, 'EUR', 'JPY', function (err, amount) {
    console.log(amount)
})

*/
