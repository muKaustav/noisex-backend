require('dotenv').config()
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

AWS.config.update({
    secretAccessKey: process.env.S3_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: process.env.S3_REGION,
    signatureVersion: 'v4'
})

const s3 = new AWS.S3({ signatureVersion: 'v4' })

let uploadToS3 = async (req, res) => {
    let filePath = req.file.path
    let fileStream = fs.createReadStream(filePath)

    fileStream.on('error', (err) => {
        console.log('File Error', err)
    })

    let params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: path.basename(filePath),
        Body: fileStream,
        ContentType: req.file.mimetype,
        Expires: 60,
        ACL: 'public-read',
        ResponseContentDisposition: 'inline',
        ResponseContentType: req.file.mimetype
    }

    s3.upload(params, async (err, result) => {
        if (err) {
            console.log("Error", err)
        } else {
            console.log("S3 Response", result)

            await unlinkAsync(req.file.path)

            res.send({
                message: "File uploaded successfully",
                data: result
            })
        }
    })
}

let downloadFromS3 = async (req, res) => {
    let { fileName } = req.query

    let params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Expires: 60,
        ACL: 'public-read',
        ResponseContentDisposition: 'inline',
        ResponseContentType: req.file.mimetype
    }

    s3.getObject(params, (err, result) => {
        if (err) {
            console.log("Error", err)
        } else {
            console.log("S3 Response", result)

            res.send({
                message: "File downloaded successfully",
                data: result
            })
        }
    })
}

let deleteFromS3 = async (req, res) => {
    let { fileName } = req.query

    let params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName
    }

    s3.deleteObject(params, (err, result) => {
        if (err) {
            console.log("Error", err)
        } else {
            console.log("S3 Response", result)

            res.send({
                message: "File deleted successfully",
                data: result
            })
        }
    })
}

module.exports = { uploadToS3, downloadFromS3, deleteFromS3 }