const Usuari = require('../models/Usuari')

// Mostra tots els usuaris
const index = (req,res,error) => {
    Usuari.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

// Mostra un usuari pel nom 
const mostra = (req,res) => {
    let usuariID = req.params.id
    Usuari.findById(usuariID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

// Afegeix un nou usuari
const afegeix = (req,res) => {
    let usuari = new Usuari({
        nom: req.body.nom,
        contrasenya: req.body.contrasenya,
        email: req.body.email,
        edat: req.body.edat
    })
    usuari.save()
    .then(response => {
        res.json({
            message: 'Usuari afegit correctament'
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

// Actualitza un usuari
const actualitza = (req,res) => {
    let usuariID = req.params.id
    let updatedData = {
        nom: req.body.nom,
        contrasenya: req.body.contrasenya,
        email: req.body.email,
        edat: req.body.edat
    }
    Usuari.findByIdAndUpdate(usuariID, {$set: updatedData})
    .then(() => {
        res.json ({
            message: 'Usuari actualitzat correctament!'
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

// Elimina un usuari
const elimina = (req,res) => {
    let usuariID = req.params.id
    Usuari.findByIdAndRemove(usuariID)
    .then(() => {
        res.json ({
            message: 'Usuari eliminat correctament!'
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

// Comprova si un usuari existeix a la base de dades
const existeix = (req,res) => {
    let usuariNom = req.params.user
    let usuariPass = req.params.password
    Usuari.find({$and:[{nom:usuariNom},{contrasenya:usuariPass}]})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "L'usuari no existeix"
        })
    })
}

module.exports = {
    index, mostra, afegeix, actualitza, elimina, existeix
}