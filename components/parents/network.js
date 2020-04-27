const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const secure = require('./secure')

const router = express.Router()

router.get('/', (req,res) => {
    let query = req.query.id || '';
    controller.get(query).then(data => {
        response.success(req,res, data, 200)
    }).catch(error => {
        response.error(req,res,error,500)
    })
})

router.post('/', (req,res) => {
    controller.add(req.body).then(data => {
        response.success(req,res,data, 200)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})

router.post('/login', (req,res) => {
    controller.login(req.body).then(data => {
        response.success(req,res,data,201)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})

router.patch('/:id', (req,res) => {
    controller.edit(req.params.id, req.body).then(data => {
        response.success(req,res,data,200)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})


/**
 * Funciones para agragar y eliminar cuentas de hijos
 */
router.post('/createchild', secure('createChild'),(req,res) => {
    controller.addChild(req.body).then(data => {
        response.success(req,res,data,200)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})

router.delete('/deleteChild',secure('createChild') ,(req,res) => {
    controller.deleteChild(req.body.child, req.body.parent).then(data => {
        response.success(req,res,data,200)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})

module.exports = router