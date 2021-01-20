const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuariSchema = new Schema({
    nom: { type: String }, 
    contrasenya: { type: String },
    email: { type: String }, 
    edat: { type: Number }
})
usuariSchema.index({ nom: 1}, { unique: true });
usuariSchema.index({ email: 1}, { unique: true });
const Usuari = mongoose.model('Usuari', usuariSchema)
module.exports = Usuari