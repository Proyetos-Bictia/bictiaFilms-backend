const Model = require('./model')

function addAdmin(admin){
    const myUser = new Model(admin);
    return myUser.save();
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
    add: addAdmin,
    emailExist
}