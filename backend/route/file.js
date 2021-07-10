var fileRouter = require('express').Router()
var multer = require('multer')
var fs = require('fs')
var upload = multer({dest: 'upload'})
var path = require('path')

fileRouter.get('/', async (req, res) => {
    let response = []
    try{
        let files = fs.readdirSync("upload")
        files.forEach(file => {
            response.push({
                name: file,
                type: path.extname(file),
                time: fs.statSync(file).birthtime,
                size: fs.statSync(file).size
            })
        })
        res.json(response)
    }
    catch (err){
        console.log(err)
        res.status(404)
    }
})

fileRouter.post('/', upload.any() ,(req, res) => {

})

module.exports = fileRouter