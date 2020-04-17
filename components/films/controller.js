const store = require('./store')

async function addFilm(film, file) {
    if (!film.name || !film.date || !film.url || !film.sinapsis  || !file) {
        return Promise.reject('Formulario incompleto')
    }
    let fileUrl = '';
    if (file) {
        fileUrl = 'http://localhost:3000/app/files_movies/'+file.filename
    }
    const mensajeCompleto = {
        name: film.name,
        date: film.date,
        url: film.url,
        sinapsis: film.sinapsis,
        image: fileUrl
    }
    return store.addFilm(mensajeCompleto)
}

module.exports = {
    addFilm
}