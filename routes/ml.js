const express = require('express')
const mlController = require('../controllers/ml')

const router = express.Router()

router.get('/', mlController.ml)

module.exports = router
