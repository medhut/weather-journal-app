const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=552225210ce83131d1b2dec23bd99941&units=metric`

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Cannot connect to weather service', undefined)
        }
        else if (response.body.message) {
            callback('Invalid data')
        }
        else {

            const data = {
                temp: response.body.main.temp,
                humid: response.body.main.humidity,
                desc: response.body.weather[0].description
            }
            callback(undefined, data)
        }

    })
}

module.exports = forecast