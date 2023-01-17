require('dotenv').config()
const cors = require('cors')
const express = require('express')
let s3Routes = require('./routes/s3')
let mlRoutes = require('./routes/ml')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the NoiseX API Subsystem.',
        status: 'OK',
        timestamp: new Date().toISOString()
    })
})

app.use('/ml', mlRoutes)
app.use('/s3', s3Routes)

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'The requested resource was not found.',
        status: 'NOT FOUND',
        timestamp: new Date().toISOString(),
        redirect: 'http://localhost:8081'
    })
})

PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})