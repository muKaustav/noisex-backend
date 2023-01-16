const express = require('express')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const s3Controller = require('../controllers/s3')

const router = express.Router()

router.post('/upload', upload.single('song'), s3Controller.uploadToS3)
router.get('/download', s3Controller.downloadFromS3)
router.delete('/delete', s3Controller.deleteFromS3)

module.exports = router
