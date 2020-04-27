const Model = require('./model')

function agregarFavorito(id, body) {
    return new Promise((resolve, reject) => {
        Model.findOneAndUpdate({ _id: id }, { $push: { favFilm: body.favFilm } }, { new: true }).exec((err, data) => {
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

            if (data.favFilm){
                data.favFilm.forEach(element => {
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
        Model.findOneAndDelete({_id: id}, {$pull: { favFilm: body.favFilm }}, {new: true}).exec((err, data) => {
            if (err){
                return reject('Ocurrio un error')
            }
            return resolve(data)
        })
    })
}

module.exports = {
    agregarFavorito: agregarFavorito,
    validarFilmFav: validarFilmFav,
    deleteFavFilm: deleteFavFilm
}