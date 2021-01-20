const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ressenyaSchema = new Schema({
    usuari: { type: String }, 
    film: { type: String },
    text: { type: String },
    valoracio: { type: Number }
}, {timestamps: true})
ressenyaSchema.index({ usuari: 1, film: 1 }, { unique: true });
const Ressenya = mongoose.model('Ressenya', ressenyaSchema)
module.exports = Ressenya