const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express configs
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join (__dirname, '../templates/views')
const partialsPath = path.join (__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials (partialsPath)

// Set upi static directory to serve
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Luke'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Luke'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
       title: 'Help',
       name: 'Luke',
       message: 'This is what is getting returned, innit.'
      })
})

app.get('/weather', (req, res) =>  {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error } )
            }

            res.send({
                forecast: forecastData,
                location, //shorthand fotm for this
                address: req.query.address  
            })
        })
    })
})

app.get('/products', (req, res) =>  {
if (!req.query.search){
    return res.send({
        error: 'You must provide a search term'
    })
}
    console.log(req.query.search)
    res.send({
        products: []       
    }
)}
)

app.get('/help/*', (req, res) =>  {
    res.render('error', {
        title: '404S',
        name: 'Luke',
        errorMsg: 'Help article not found.'
    } )}
)

app.get('*', (req, res) =>  {
    res.render('error', {
        title: '404',
        name: 'Luke',
        errorMsg: 'Page not found.'
    } )}
)

app.listen(port, () => {
    console.log('Server is up on port ' +port);
})