const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', (req,res) => {
    response.success(req,res,'estamos en get', 200)
})

router.post('/', (req,res) => {
    controller.addAdmin(req.body).then(data => {
        response.success(req,res,data, 201)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})

router.post('/login', (req, res) => {
    controller.login(req.body).then(data => {
        response.success(req,res,data,200)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})

module.exports = router