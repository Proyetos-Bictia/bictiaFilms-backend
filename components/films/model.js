const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let email_match = [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Coloca un email correcto"]

const mySchema = new Schema({
    name: {type: String, required: true, minlength: [2, 'El nombre es muy corto']},
    date: {type: Date, required: true},
    url: {type: String, required: true , minlength: [10, 'Url muy corta']},
    image: {type: String, required: true},
    sinapsis: {type: String, required: true, minlength:[20, 'La sinapsis debe ser de minimo 20 espacios']}
}, {
    timestamps: true
})

const model = mongoose.model('Film', mySchema);
module.exports = model