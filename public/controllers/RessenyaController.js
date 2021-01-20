const Ressenya = require('../models/Ressenya')

// Mostra les ressenyes
const index = (req,res,error) => {
    Ressenya.find()
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

// Mostra les ressenyes d'un usuari
const mostraUsuari = (req,res) => {
    let usuari = req.params.id
    Ressenya.find(
        {
            $or:[
                {usuari:usuari}
            ]
        }
    )
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

// Mostra les ressenyes d'una pel·lícula
const mostraFilm = (req,res) => {
    let film = req.params.nom
    Ressenya.find(
        {
            $or:[
                {film:film}
            ]
        }
    )
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

// Afegeix una nova ressenya
const afegeix = (req,res) => {
    let ressenya = new Ressenya({
        usuari: req.body.usuari,
        film: req.body.film,
        text: req.body.text,
        valoracio: req.body.valoracio
    })
    ressenya.save()
    .then(response => {
        res.json({
            message: 'Ressenya afegida correctament'
        })
    })
    .catch(error => {
        res.json({
            message: 'Ja tens una ressenya sobre el film!'
        })
    })
}

// Actualitza una ressenya
const actualitza = (req,res) => {
    let ressenyaID = req.params.id
    let updatedData = {
        usuari: req.body.usuari,
        film: req.body.film,
        text: req.body.text,
        valoracio: req.body.valoracio
    }
    Ressenya.findByIdAndUpdate(ressenyaID, {$set: updatedData})
    .then(() => {
        res.json ({
            message: 'Ressenya actualitzada correctament!'
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

// Elimina una ressenya
const elimina = (req,res) => {
    let ressenyaID = req.params.id
    Ressenya.findByIdAndRemove(ressenyaID)
    .then(() => {
        res.json ({
            message: 'Ressenya eliminada correctament!'
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

module.exports = {
    index, mostraUsuari, mostraFilm, afegeix, actualitza, elimina
}