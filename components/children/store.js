const Model = require('./model')

function agregarFavorito(id, body) {
    console.log(id, body)
    return new Promise((resolve, reject) => {
        Model.findOneAndUpdate({ _id: id }, { $push: { favFilms: body.favFilm } }, { new: true }).exec((err, data) => {
            if (err) {
                return reject('Ocurrio un error')
            }
            return resolve(data)
        })
    })
}

function validarFilmFav(id, body) {
    return new Promise((resolve, reject) => {
        Model.findOne({ _id: id }).exec((error, data) => {
            if (error) {
                return reject('error al buscar el film en favoritos')
            }

            if (data.favFilms){
                data.favFilms.forEach(element => {
                    if (element == body.favFilm){
                        return reject('esta cancion ya esta agregada en favoritos del usuario')
                    }
                })
                return resolve(true)
            }else{
                return resolve(true)
            }
        })
    })
}

function deleteFavFilm(id, body) {
    return new Promise((resolve, reject) => {
        Model.findOneAndUpdate({_id: id}, {$pull: { favFilms: {$in: body.favFilm} }}, {new: true}).exec((err, data) => {
            if (err){
                return reject('Ocurrio un error')
            }
            return resolve(data)
        })
    })
}

function listChildByParent(id){
    return new Promise((resolve,reject) => {
        Model.find({parent: id}).exec((error, data) => {
            if (error){
                return reject('Ocurrio un error')
            }
            if (!data || data == '' || data == null){
                return reject('No se encontro ninguna coincidencia')
            }
            return resolve(data)
        })
    })
}

module.exports = {
    agregarFavorito: agregarFavorito,
    validarFilmFav: validarFilmFav,
    deleteFavFilm: deleteFavFilm,
    listChildByParent: listChildByParent
}