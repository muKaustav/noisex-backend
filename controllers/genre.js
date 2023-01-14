require('dotenv').config()
const axios = require('axios')

let genre_classifier = (req, res) => {
    var config = {
        method: 'get',
        url: process.env.GC_MACHINE + req.query.url,
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

module.exports = { genre_classifier }