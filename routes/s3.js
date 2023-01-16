const express = require('express')
var multer = require('multer')
var path = require('path')
const s3Controller = require('../controllers/s3')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

let upload = multer({ storage: storage })

const router = express.Router()

router.post('/upload', upload.single('song'), s3Controller.uploadToS3)
router.get('/download', s3Controller.downloadFromS3)
router.delete('/delete', s3Controller.deleteFromS3)

module.exports = router
