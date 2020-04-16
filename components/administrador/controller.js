const bcrypt = require('bcrypt')
const store = require('./store')
const authExport = require('../../auth/index') 

async function addAdmin(admin) {
    if(!admin.name || !admin.lastName || !admin.email || !admin.password || !admin.phone){
        return Promise.reject('faltan parametros')
    }
    const fullMessage = {
        name: admin.name,
        lastName: admin.lastName,
        email: admin.email,
        password: await bcrypt.hash(admin.password, 5),
        phone: admin.phone,
        rol: "ROL_ADMIN"
    }

    return store.add(fullMessage)
}

async function login(data){
    if(!data.email, !data.password){
        return Promise.reject('faltan parametros')
    }
    let admin = await store.emailExist(data.email)

    const auth = {
        id: admin._id,
        email: admin.email,
        rol: admin.rol
    }

    const adminFinal = {
        ...auth,
        token: authExport.sign(auth)
    }

    return bcrypt.compare(data.password, admin.password).then(sonIguales => {
        if (sonIguales === true) {
            return adminFinal
        } else {
            return Promise.reject('La constraseña no coincide')
        }
    })
}

module.exports = {
    addAdmin,
    login
}