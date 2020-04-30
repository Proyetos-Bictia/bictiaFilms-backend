const mongoose = require('mongoose');
const store = require('./store');

async function addFavoriteFilm(id, body){
    if (!id || !body.favFilm){
        return Promise.reject('Informacion invalida')
    }
    if (mongoose.Types.ObjectId.isValid(id) !== true || mongoose.Types.ObjectId.isValid(body.favFilm) !== true){
        return Promise.reject('id`s invalidos')
    }

    let validator = await store.validarFilmFav(id, body)

    return store.agregarFavorito(id,body)
}

async function deleteFavFilm(id, body){
    if(!id || !body.favFilm){
        return Promise.reject('informacion invalida')
    }
    if (mongoose.Types.ObjectId.isValid(id) !== true || mongoose.Types.ObjectId.isValid(body.favFilm) !== true) {
        return Promise.reject('Algun id no es valido')
    }

    return store.deleteFavFilm(id,body)
}

async function listChildForParent(id){
    if(!id){
        return Promise.reject('falta el id del padre')
    }
    if (mongoose.Types.ObjectId.isValid(id) !== true) {
        return Promise.reject('id no valido para mongo')
    }
    return store.listChildByParent(id)
}

async function childById(id){
    if(!id){
        return Promise.reject('fatlan parametros')
    }
    if(mongoose.Types.ObjectId.isValid(id) !== true){
        return Promise.reject('El id no es valido')
    }

    return store.childById(id)
}

module.exports = {
    addFavoriteFilm,
    deleteFavFilm,
    listForParent: listChildForParent,
    childById
}