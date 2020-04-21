const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {type: String, required: true, minlength: [2, 'El nombre es muy corto']},
    parent : {type: Schema.Types.ObjectId, ref: 'Parent', required:true},
    favFilms: [{type: Schema.Types.ObjectId, ref: 'Film'}]
}, {
    timestamps: true
})

const model = mongoose.model('Child', mySchema);
module.exports = model