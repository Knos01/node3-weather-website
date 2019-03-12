const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Christian Kobril'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Christian Kobril'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'I am here to help you',
    name: 'Christian Kobril'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      } else {
        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address
        })
      }
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: [req.query.search]
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'ERROR 404',
    error: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'ERROR 404',
    error: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
