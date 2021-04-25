const https = require('https')

//function call format convertCurrency(currency amount(int), '[from Currency Code]', '[to Currency Code]', CB)
//cb format = function(error, value)
function convertCurrency(amount, fromCurrency, toCurrency, cb) {
    fromCurrency = encodeURIComponent(fromCurrency)
    toCurrency = encodeURIComponent(toCurrency)
    const query = fromCurrency + '_' + toCurrency

    const url =
        'https://free.currconv.com/api/v7/convert?q=' +
        query +
        '&compact=ultra&apiKey=' +
        API_KEY //replace with actual API KEY

    https
        .get(url, function (res) {
            var body = ''

            res.on('data', function (chunk) {
                body += chunk
            })

            res.on('end', function () {
                try {
                    const jsonObj = JSON.parse(body)

                    const val = jsonObj[query] //stores the conversion rate based on query in val so for example
                    // if the query was USD_PHP then val = 48.402497
                    if (val) {
                        //if there is a value for val
                        const total = val * amount //multiplies the val by the input amount
                        cb(null, Math.round(total * 100) / 100)
                    } else {
                        const err = new Error('Value not found for ' + query)
                        console.log(err)
                        cb(err)
                    }
                } catch (e) {
                    console.log('Parse error: ', e)
                    cb(e)
                }
            })
        })
        .on('error', function (e) {
            console.log('Got an error: ', e)
            cb(e)
        })
}

module.exports = { converCurrency }

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
