const express = require('express')
const router = express.Router()

const RessenyaController = require('../controllers/RessenyaController')

router.get('/', RessenyaController.index)
router.get('/usuari/:id', RessenyaController.mostraUsuari)
router.get('/:nom', RessenyaController.mostraFilm)
router.post('/', RessenyaController.afegeix)
router.put('/:id', RessenyaController.actualitza)
router.delete('/:id', RessenyaController.elimina)

module.exports = router