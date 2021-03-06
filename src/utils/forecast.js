const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/a2d13e9a54f055a96d891539cc9da18f/' + latitude + ',' + longitude + '?units=si'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + '° out but it feels like ' + body.currently.apparentTemperature +
      '°. High today is ' + body.daily.data[0].temperatureHigh + '° with a low of ' + body.daily.data[0].temperatureLow + '°. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast
