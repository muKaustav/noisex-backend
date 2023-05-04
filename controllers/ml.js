require('dotenv').config()
const axios = require('axios')

let genre = (req, res) => {
    var config = {
        method: 'get',
        url: process.env.GENRE_MACHINE + req.query.key,
        headers: {}
    }

    axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data))
            res.status(200).send(response.data)
        })
        .catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })
}

let instrument = (req, res) => {
    console.log(req.query.key)
    var config = {
        method: 'get',
        url: process.env.INSTRUMENT_MACHINE + req.query.key,
        headers: {}
    }

    axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data))
            res.status(200).send(response.data)
        })
        .catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })
}

module.exports = { genre, instrument }