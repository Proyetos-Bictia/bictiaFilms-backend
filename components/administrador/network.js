const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const secure = require('./secure')

const router = express.Router()

router.get('/', (req,res) => {
    controller.listarAdmin(req.query.id || null).then(admin => {
        response.success(req,res,admin, 201)
    }).catch(e => {
        response.error(req,res,e,403)
    })
})

router.post('/',secure('createAdmin'), (req,res) => {
    controller.addAdmin(req.body).then(data => {
        response.success(req,res,data, 201)
    }).catch(e => {
        console.log("Error =>", e)
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