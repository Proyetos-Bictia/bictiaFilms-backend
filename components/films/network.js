const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const multer = require('multer');
const secure = require('./secure')

const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files_movies/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})

const upload = multer({ storage: storage })

router.get('/', (req,res) => {
    controller.listFilm(req.query.id || null).then(film => {
        response.success(req,res,film, 201)
    }).catch(e => {
        response.error(req,res,e,403)
    })
})

router.post('/', upload.single('image'), (req,res) => {
    controller.addFilm(req.body, req.file).then(film => {
        response.success(req,res,film, 201)
    }).catch(e => {
        response.error(req,res,e,403)
    })
})

module.exports = router