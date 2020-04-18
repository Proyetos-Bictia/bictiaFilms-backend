const store = require('./store')
const mongoose = require('mongoose')

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
        ...parent,
        rol: "ROL_PARENT",
        childs: []
    }
    return store.add(fullMessage)
}

module.exports = {
    add: addParent,
    get: getParent
}