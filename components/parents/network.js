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

router.delete('/:id', secure('deleteParent'),(req,res) => {
    controller.deleteParent(req.params.id).then(data => {
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

router.delete('/deleteChild/:id_parent/:id_child',(req,res) => {
    controller.deleteChild(req.params.id_parent, req.params.id_child).then(data => {
        response.success(req,res,data,200)
    }).catch(e => {
        response.error(req,res,e,500)
    })
})

router.patch('/editPass/:id', (req, res) => {
    controller.editPass(req.params.id,req.body).then(data => {
        console.log('entro a patch - editPass')
        response.success(req,res,data, 200)
    }).catch(e => {
        console.error('Error => ',e);
        response.error(req,res,e, 400)
    })
})

module.exports = router