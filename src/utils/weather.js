const request = require('postman-request')

const weather = (longitude, latitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=12309b0e944045529ce164859211911&q=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&condition:text'

    // request({ url: url, json: true}, (error, response) => {
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location via coordinates. Try another search.', undefined)
        } else {
            callback(undefined, {
                date: body.location.localtime,
                current_weather_summary: body.current.condition.text,
                current_temp: body.current.temp_c
            })
        }
    })

}

module.exports = weather