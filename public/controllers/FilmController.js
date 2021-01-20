const Film = require('../models/Film')

// Mostra els films
const index = (req,res,error) => {
    Film.find()
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

// Mostra un sol film
const mostra = (req,res) => {
    let nomFilm = req.params.nom
    Film.find(
        {
            $or:[
                {nom:nomFilm}
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

// Afegeix un nou film
const afegeix = (req,res) => {
    let film = new Film({
        nom: req.body.nom,
        director: req.body.director,
        descripcio: req.body.descripcio,
        any: req.body.any
    })
    film.save()
    .then(response => {
        res.json({
            message: 'Film afegida correctament'
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

// Actualitza un film
const actualitza = (req,res) => {
    let filmID = req.params.id
    let updatedData = {
        nom: req.body.nom,
        director: req.body.director,
        descripcio: req.body.descripcio,
        any: req.body.any
    } 
    Film.findByIdAndUpdate(filmID, {$set: updatedData})
    .then(() => {
        res.json ({
            message: 'Film actualitzada correctament!'
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

// Elimina un film
const elimina = (req,res) => {
    let filmID = req.params.id
    Film.findByIdAndRemove(filmID)
    .then(() => {
        res.json ({
            message: 'Film eliminada correctament!'
        })
    })
    .catch(error => {
        res.json({
            message: 'Hi ha hagut un error!'
        })
    })
}

module.exports = {
    index, mostra, afegeix, actualitza, elimina
}