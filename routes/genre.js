const express = require('express')
const genreController = require('../controllers/genre')

const router = express.Router()

router.get('/', genreController.genre_classifier)

module.exports = router
