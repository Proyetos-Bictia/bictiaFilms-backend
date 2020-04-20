const store = require('./store')
const mongoose = require('mongoose')
const authExport = require('../../auth/index')
const bcrypt = require('bcrypt')


async function getParent(query){
    if(query === ''){
        return store.search()
    }
    if(mongoose.Types.ObjectId.isValid(query)){
        return store.searchId(query)
    }
    return 'Id no es valido'
}

async function addParent(parent){
    if(!parent.name || !parent.lastName || !parent.email || !parent.password || !parent.phone || !parent.birthDate || !parent.creditCard){
        return Promise.reject('Formulario incompleto')
    }
    const fullMessage = {
        name: parent.name,
        lastName: parent.lastName,
        email: parent.email,
        password : await bcrypt.hash(parent.password,5),
        phone: parent.phone,
        birthDate: parent.birthDate,
        creditCard: parent.creditCard,
        rol: "ROL_PARENT",
        childs: []
    }
    return store.add(fullMessage)
}

async function loginParent(data){
    if(!data.email || !data.password){
        return Promise.reject('Faltan parametros')
    }

    let validation = await store.emailValidation(data.email)

    const auth = {
        id: validation._id,
        email: validation.email,
        rol: validation.rol
    }

    const adminFinal = {
        token: authExport.sign(auth)
    }

    return bcrypt.compare(data.password, validation.password).then(sonIguales => {
        if (sonIguales === true) {
            return adminFinal
        } else {
            return Promise.reject('La constraseña no coincide')
        }
    })
}

module.exports = {
    add: addParent,
    get: getParent,
    login: loginParent
}