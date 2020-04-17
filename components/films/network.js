const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.post('/', (req,res) => {
    controller.addFilm(req.body).then(film => {
        response.success(req,res,film, 201)
    }).catch(e => {
        response.error(req,res,e,403)
    })
})

module.exports = router