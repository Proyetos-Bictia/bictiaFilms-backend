const admin = require('../components/administrador/network')
const film = require('../components/films/network')
const parent = require('../components/parents/network')

const routes = function (server) {
    server.use('/admin', admin)
    server.use('/film', film)
    server.use('/parent', parent)
}

module.exports = routes