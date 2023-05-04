const express = require('express')
const mlController = require('../controllers/ml')

const router = express.Router()

router.get('/genre', mlController.genre)
router.get('/instrument', mlController.instrument)

module.exports = router
