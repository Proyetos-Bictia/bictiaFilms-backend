const Model = require('./model')
const ModelChild = require('../children/model')

function addParent(parent) {
    const myModel = new Model(parent)
    return myModel.save()
}

function search() {
    return new Promise((resolve, reject) => {
        Model.find().exec((err, data) => {
            if (err) {
                reject('Ocurrio un error en la busqueda')
            }
            if (data.length === 0) {
                reject('No se encontraron resutlados en la busqueda')
            }
            if (data.length !== 0) {
                resolve(data)
            }
        })
    })
}

function searchById(query) {
    return new Promise((resolve, reject) => {
        Model.findOne({ _id: query }).exec((err, data) => {
            if (err) {
                reject('Ocurrio un error en la busqueda')
            }
            if (data.length === 0) {
                reject('No se encontraron resutlados en la busqueda')
            }
            if (data.length !== 0) {
                resolve(data)
            }
        })
    })
}

function emailExist(email) {
    return new Promise((resolve, reject) => {
        Model.findOne({ email: email }).exec((err, data) => {
            if (err) {
                reject('Ocurrio un error')
            }
            if (!data) {
                reject('No existe ese correo')
            }
            resolve(data)
        })
    })
}

function validationParenExist(id) {
    return new Promise((resolve, reject) => {
        Model.countDocuments({ _id: id }).exec((err, count) => {
            if (err) {
                reject('Error en la validación del ID del padre')
            }
            if (count === 0) {
                reject(`no se encontro ningun padre con el id: ${id}`)
            }
            if (count > 0) {
                resolve(true)
            }
        })
    })
}

function addChild(child) {
    const myChild = new ModelChild(child)
    return myChild.save()
}

function getChildrenByParent(idParent, idChild) {
    return new Promise((resolve, reject) => {
        ModelChild.findOneAndRemove({ parent: idParent, _id: idChild }).exec((err, data) => {
            console.log('esto es la data ===>' + data);
            if (err) {
                reject('Ocurrio un problema en la busqueda de los hijos')
            }
            if (data === '' || !data || data == null) {
                reject('No se encontro ningun dato relacionados con los Id`s')
            } else {
                resolve(`se elimino el hijo ${data.name} exitosamente`)
            }
        })
    })
}

function editParent(idParent, data) {
    return new Promise((resolve, reject) => {
        Model.findByIdAndUpdate({ _id: idParent }, data, { new: true }).exec((err, data) => {
            if (err) {
                reject('Ocurrio un problema en la edicion')
            }
            if (data === '' || !data || data == null) {
                reject('No se encontro ningun padre')
            }
            resolve(data)
        })
    })
}

function deleteParent(id){
    console.log('este es el id '+ id);
    return new Promise((resolve,reject) => {
        Model.findByIdAndRemove({_id: id}).exec((err,data) => {
            console.log('esto es data en store :' + data);
            if(err){
                reject('Ocurrio error en la busqueda de padre')
            }
            if(data === '' || !data || data == null){
                reject('No se encontro ningun padre para borrar')
            }
            resolve(data)
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
    getChildren: getChildrenByParent,
    editParent,
    delete: deleteParent,
}