const Model = require('./model')
const ModelParent = require('../parents/model')

function addAdmin(admin){
    const myUser = new Model(admin);
    return myUser.save();
}

function emailExist(email){
    return new Promise((resolve, reject) => {
        Model.findOne({email: email}).exec( async (err,data) => {
            if(err){
                reject('Ocurrio un error')
            }

            if(!data){
                try{
                    const final = await emailParentExist(email)
                    resolve(final)
                }catch{
                    reject('no se encontro nada')
                }
            }

            resolve(data)
        })
    })
}

function emailParentExist(email){
    return new Promise((resolve, reject) => {
        ModelParent.findOne({email: email}).exec( (err,data) => {
            console.log('esto es data => ' +data);
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

function getAdmins(id){
    let filter = {}
    if(id !== null){
        filter = {_id: id}
    }
    console.log(filter)
    return new Promise((resolve,reject) => {
        Model.find(filter).exec((err, data) => {
            if(err){
                reject('Ocurrio un error en la busqueda')
            }
            if(data.length === 0){
                reject('No hay ningun administrador por listar')
            }
            resolve(data)
        })
    })
}

module.exports = {
    add: addAdmin,
    emailExist,
    getAdmins
}