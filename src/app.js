const path = require('path')

const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000 // uses port 3000 if running locally

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
console.log(__filename)

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up heandlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

const name = 'AK'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Center',
        message: 'Something broke',
        name
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term.'
        })
    } else {
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
            if (error) {
                return res.send({ error })
            }
        
            weather(longitude, latitude, (error, {date, current_weather_summary, current_temp} = {}) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    weather: {
                        date,
                        address_provided: req.query.address,
                        location,
                        current_weather_summary,
                        current_temp
                    }
                })
                
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404',  {
        title: '404',
        errorMessage: 'Help article not found.',
        name
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name
    })
})

app.listen(port, () => {
    console.log('Server running on port:', port)
})