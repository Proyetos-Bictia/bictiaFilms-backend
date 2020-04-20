const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', (req,res) => {
    let query = req.query.id || '';
    controller.get(query).then(data => {
        response.success(req,res, data, 200)
    }).catch(error => {
        response.error(req,res,error,200)
    })
})

router.post('/', (req,res) => {
    controller.add(req.body).then(data => {
        response.success(req,res,data, 200)
    }).catch(e => {
        response.error(req,res,e,200)
    })
})

router.post('/login', (req,res) => {
    controller.login(req.body).then(data => {
        response.success(req,res,data,201)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})

module.exports = router