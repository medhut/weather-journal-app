// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express()

const port = process.env.PORT || 5000
/* Middleware*/

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

const bodyParser = require('body-parser')

const cors = require('cors')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            Error: 'You must enter an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, projectData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({ projectData, location })
        })
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})