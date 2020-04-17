const admin = require('../components/administrador/network')
const film = require('../components/films/network')

const routes = function (server) {
    server.use('/admin', admin)
    server.use('/film', film)
}

module.exports = routes