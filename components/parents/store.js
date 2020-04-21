const Model = require('./model')
const ModelChild = require('../children/model')

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

function validationParenExist(id){
    return new Promise((resolve,reject) => {
        Model.countDocuments({_id: id}).exec((err, count) => {
            if(err){
                reject('Error en la validación del ID del padre')
            }
            if(count === 0 ){
                reject(`no se encontro ningun padre con el id: ${id}`)
            }
            if(count > 0){
                resolve(true)
            }
        })
    })
}

function addChild(child){
    const myChild = new ModelChild(child)
    return myChild.save()
}

function pushChild(idParent, idchild){
    return new Promise((resolve,reject) => {
        Model.findOneAndUpdate({_id: idParent}, {$push: {childs: idchild}}).exec((err, data) => {
            if(err){
                reject('Ocurrio un problema al hacer push de padre')
            }
            if(!data, data == null, data == ''){
                reject('No se encontro el id para hacer push')
            }
            resolve (true)
        })
    })
}

module.exports = {
    add: addParent,
    search,
    searchId: searchById,
    emailValidation: emailExist,
    validation: validationParenExist,
    addChild,
    pushChild:pushChild
}