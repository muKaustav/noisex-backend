require('dotenv').config()
const axios = require('axios')

let audio_fingerprint = (req, res) => {
    var config = {
        method: 'get',
        url: process.env.AF_MACHINE + req.query.url,
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

module.exports = { audio_fingerprint }