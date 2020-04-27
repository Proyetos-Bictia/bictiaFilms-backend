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

    let edit = await store.addFavoriteFilm(id, body)
    return edit
}

async function deleteFavFilm(id, body){
    if(!id || !body.favFilm){
        return Promise.reject('informacion invalida')
    }
    if (mongoose.Types.ObjectId.isValid(id) !== true || mongoose.Types.ObjectId.isValid(body.favFilm) !== true) {
        return Promise.reject('Algun id no es valido')
    }

    let edit = await store.deleteFavFilm(id, body)
    return edit
}

module.exports = {
    addFavoriteFilm,
    deleteFavFilm
}