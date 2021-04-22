var https = require('https')

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
    var apiKey = '63a107cf0f91eaa9a44f'

    fromCurrency = encodeURIComponent(fromCurrency)
    toCurrency = encodeURIComponent(toCurrency)
    var query = fromCurrency + '_' + toCurrency

    var url =
        'https://free.currconv.com/api/v7/convert?q=' +
        query +
        '&compact=ultra&apiKey=' +
        apiKey

    https
        .get(url, function (res) {
            var body = ''

            res.on('data', function (chunk) {
                body += chunk
            })

            res.on('end', function () {
                try {
                    var jsonObj = JSON.parse(body)

                    var val = jsonObj[query] //stores the conversion rate based on query in val so for example
                    // if the query was USD_PHP then val = 48.402497
                    if (val) {
                        //if there is a value for val
                        var total = val * amount //multiplies the val by the input amount
                        cb(null, Math.round(total * 100) / 100)
                    } else {
                        var err = new Error('Value not found for ' + query)
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

//test #1
//function call format convertCurrency(currency amount(int), '[from Currency Code]', '[to Currency Code]', CB)

convertCurrency(10, 'EUR', 'JPY', function (err, amount) {
    console.log(amount)
})

//test #2
convertCurrency(10, 'EUR', 'JPY', function (err, amount) {
    console.log(amount)
})
