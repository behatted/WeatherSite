const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/5c9717c579534566b22cb18070296d70/' + encodeURIComponent(lat) + ',' + encodeURIComponent(lat) + '?units=si'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services', undefined)
        } else if (body.error) {
            callback('Unable to find that lat long pair. Try another search.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' The current temp is: ' + body.currently.temperature + ', and the chance of rain is:' + body.currently.precipProbability) 
            }
        })
}

module.exports = forecast