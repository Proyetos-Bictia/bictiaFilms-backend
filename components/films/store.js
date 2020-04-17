const Model = require('./model')

function addFilm(film){
    const myFilm = new Model(film)
    return myFilm.save()
}

module.exports = {
    addFilm: addFilm
}