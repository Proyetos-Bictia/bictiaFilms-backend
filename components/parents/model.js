const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

let email_match = [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Coloca un email correcto"]

const mySchema = new Schema({
    name: {type: String, required: true, minlength: [2, 'El nombre es muy corto']},
    lastName : {type: String, required: true, minlength: [2, 'El nombre es muy corto']},
    email: {type: String, required:true, match: email_match, unique:true},
    password: {type: String, required: true, minlength: [2, 'La contraseña debe tener minimo 6 espaciós']},
    phone: {type: String, required: true, minlength: [10, 'su numero debe tener minimo 10 campos'], maxlength: [10, 'su numero debe tener maximo 10 espacios']},
    birthDate: {type: Date, required: true},
    creditCard: {type: String, required: true, minlength:[10, 'Esta no es una tarjeta valida'], maxlength: [10,'Esta no es una tarjeta valida']},
    rol: {type: String, required: true}
}, {
    timestamps: true
})

const model = mongoose.model('Parent', mySchema);
module.exports = model