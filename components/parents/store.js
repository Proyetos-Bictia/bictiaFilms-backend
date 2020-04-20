const Model = require('./model')

function addParent(parent){
    const myModel = new Model(parent)
    return myModel.save()
}

function search(){
    return new Promise ((resolve, reject) => {
        Model.find().exec((err, data) => {
            if(err){
                reject('Ocurrio un error en la busqueda')
            }
            if(data.length === 0){
                reject('No se encontraron resutlados en la busqueda')
            }
            if(data.length !== 0){
                resolve(data)
            }
        })
    })
}

function searchById(query){
    return new Promise ((resolve, reject) => {
        Model.findOne({_id : query}).exec((err, data) => {
            if(err){
                reject('Ocurrio un error en la busqueda')
            }
            if(data.length === 0){
                reject('No se encontraron resutlados en la busqueda')
            }
            if(data.length !== 0){
                resolve(data)
            }
        })
    })
}

function emailExist(email){
    return new Promise((resolve, reject) => {
        Model.findOne({email: email}).exec( (err,data) => {
            if(err){
                reject('Ocurrio un error')
            }
            if(!data){
                reject('No existe ese correo')
            }
            resolve(data)
        })
    })
}

module.exports = {
    add: addParent,
    search,
    searchId: searchById,
    emailValidation: emailExist
}