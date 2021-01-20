const express = require('express')
const router = express.Router()

const FilmController = require('../controllers/FilmController')

router.get('/', FilmController.index)
router.get('/:nom', FilmController.mostra)
router.post('/', FilmController.afegeix)
router.put('/:id', FilmController.actualitza)
router.delete('/:id', FilmController.elimina)

module.exports = router