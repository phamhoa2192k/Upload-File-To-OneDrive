var storageConfig = require('../config').storage
var fileRouter = require('express').Router()
var multer = require('multer')
var fs = require('fs')
var path = require('path')
const UPLOAD_DIR = "upload/"
var storage = multer.diskStorage(storageConfig)
var upload = multer({ storage: storage })

function getDir(dir) {
    let response = []
    try {
        let files = fs.readdirSync(dir)
        files.forEach(file => {
            response.push({
                name: file,
                type: path.extname(dir + file),
                time: fs.statSync(dir + file).birthtime,
                size: fs.statSync(dir + file).size
            })
        })
    } catch (err) {
        console.log(err)
    }
    return response
}

fileRouter.get('/', async (req, res) => {
    let path = req.path
    let response = getDir(UPLOAD_DIR + path)
    if (response.length) {
        res.json(response)
    } else {
        res.status(404)
    }
})

fileRouter.post('/upload', upload.any(), (req, res) => {
    let response = getDir(UPLOAD_DIR)
    if (response.length) {
        res.json(response)
    } else {
        res.status(404)
    }
})

module.exports = fileRouter