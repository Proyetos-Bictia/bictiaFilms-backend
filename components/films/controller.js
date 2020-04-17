const store = require('./store')

async function addFilm(film){
    if(!film.name, !film.date, !film.url, !film.image, !film.sinapsis){
        return Promise.reject('Formulario incompleto')
    }
    return store.add(film)
}

module.exports = {
    addFilm
}