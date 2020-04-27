const store = require('./store')
const mongoose = require('mongoose')
const authExport = require('../../auth/index')
const bcrypt = require('bcrypt')


async function getParent(query) {
    if (query === '') {
        return store.search()
    }
    if (mongoose.Types.ObjectId.isValid(query)) {
        return store.searchId(query)
    }
    return 'Id no es valido'
}

async function addParent(parent) {
    if (!parent.name || !parent.lastName || !parent.email || !parent.password || !parent.phone || !parent.birthDate || !parent.creditCard) {
        return Promise.reject('Formulario incompleto')
    }
    const fullMessage = {
        name: parent.name,
        lastName: parent.lastName,
        email: parent.email,
        password: await bcrypt.hash(parent.password, 5),
        phone: parent.phone,
        birthDate: parent.birthDate,
        creditCard: parent.creditCard,
        rol: "ROL_PARENT"
    }
    return store.add(fullMessage)
}

async function loginParent(data) {
    if (!data.email || !data.password) {
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

async function editParent(idParent, data){
    if(!idParent || !data.name || !data.lastName || !data.email || !data.phone || !data.birthDate || !data.creditCard){
        return Promise.reject('Falta id o data de la edición')
    }
    if(!mongoose.Types.ObjectId.isValid(idParent)){
        return Promise.reject('No es un id valido para la db')
    }

    const fullMessage = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate,
        creditCard: data.creditCard
    }

    return store.editParent(idParent, fullMessage)
}

async function deleteParent(id){
    if(!id){
        return Promise.reject('id es obligatorio')
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return Promise.reject('no es un id valido para mongo')
    }
    console.log('retornando id' +id)
    return store.delete(id)
}

// CONTROLADOR DEL HIJO

/**
 * 
 * @param {*} child es la data del hijo que se recibo por body 
 */

async function addChild(child) {
    if (!child.name || !child.parent) {
        return Promise.reject('Formulario incompleto')
    }
    if (mongoose.Types.ObjectId.isValid(child.parent) === false) {
        return Promise.reject('Id no valido')
    }

    await store.validation(child.parent)

    const fullMessage = {
        name: child.name,
        parent: child.parent,
        favFilms: []
    }
    const childCreate = await store.addChild(fullMessage)

    return childCreate
}

/**
 * 
 * @param {*} idChild se recibe por body 
 * @param {*} idParent se recibe por body
 */

async function deleteChild(idChild, idParent){
    if(!idChild || !idParent){
        return Promise.reject('Id hijo, Id padre son obligatorios')
    }
    if(!mongoose.Types.ObjectId.isValid(idChild) || !mongoose.Types.ObjectId.isValid(idParent)){
        return Promise.reject('Este no es un id valido para la db')
    }

    const child = await store.getChildren(idParent, idChild)

    return child
}

module.exports = {
    add: addParent,
    get: getParent,
    login: loginParent,
    addChild,
    deleteChild,
    edit: editParent,
    deleteParent 
}