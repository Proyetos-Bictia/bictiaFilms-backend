const express = require('express')
const path = require('path')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router();

router.get('/listParent/:id',(req,res) => {
    controller.listForParent(req.params.id).then(data => {
        response.success(req, res, data, 200)
    }).catch(e => {
        response.error(req, res, e, 500)
    })
})

router.patch('/addFavFilm/:id', (req, res) => {
    controller.addFavoriteFilm(req.params.id, req.body).then(data => {
        response.success(req, res, data, 200)
    }).catch(e => {
        response.error(req, res, e, 500)
    })
})

router.patch('/deleteFavFilm/:id', (req, res) => {
    controller.deleteFavFilm(req.params.id, req.body).then(data => {
        response.success(req, res, data, 200)
    }).catch(e => {
        response.error(req, res, e, 500)
    })
})

router.get('/childbyid/:id', (req,res) => {
    controller.childById(req.params.id).then(data => {
        response.success(req,res,data, 200)
    }).catch(e => {
        response.error(req,res,e,501)
    })
})

module.exports = router;