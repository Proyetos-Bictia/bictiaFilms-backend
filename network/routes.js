const admin = require('../components/administrador/network')

const routes = function (server) {
    server.use('/admin', admin)
}

module.exports = routes