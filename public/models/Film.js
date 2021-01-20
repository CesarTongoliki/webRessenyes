const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filmSchema = new Schema({
    nom: { type: String }, 
    director: { type: String },
    descripcio: { type: String }, 
    any: { type: Number }
})
filmSchema.index({ nom: 1}, { unique: true });
const Film = mongoose.model('Film', filmSchema)
module.exports = Film