const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let email_match = [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Coloca un email correcto"]

const mySchema = new Schema({
    name: {type: String, required: true, minlength: [2, 'el nombre es muy corto']},
    lastName: {type: String, required: true, minlength: [2, 'el apellido es muy corto']},
    email: {type: String, required: true, match:email_match, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    rol: {type: String, required: true}
}, {
    timestamps: true
})

const model = mongoose.model('Admin', mySchema);
module.exports = model