const express = require('express')
const audio_fingerprintController = require('../controllers/audio-f')

const router = express.Router()

router.get('/', audio_fingerprintController.audio_fingerprint)

module.exports = router
