require('dotenv').config()
const axios = require('axios')

let ml = (req, res) => {
    var config = {
        method: 'get',
        url: process.env.ML_MACHINE + req.query.url,
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

module.exports = { ml }