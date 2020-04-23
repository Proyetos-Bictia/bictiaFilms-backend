const Model = require('./model')

function addFilm(film){
    const myFilm = new Model(film)
    return myFilm.save()
}

function listFilm(id){
    let filter = {}
    if(id !== null){
        filter = {_id: id}
    }
    return new Promise((resolve,reject) => {
        Model.find(filter).exec((err, data) => {
            if(err){
                reject('Ocurrio un error en la busqueda')
            }
            if(data.length === 0){
                reject('No hay ninguna pelicula por listar')
            }
            resolve(data)
        })
    })
}

module.exports = {
    addFilm: addFilm,
    listFilm:listFilm
}