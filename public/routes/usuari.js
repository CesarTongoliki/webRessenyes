const express = require('express')
const router = express.Router()

const UsuariController = require('../controllers/UsuariController')

router.get('/', UsuariController.index)
router.get('/:id', UsuariController.mostra)
router.get('/:user/:password', UsuariController.existeix)
router.post('/', UsuariController.afegeix)
router.put('/:id', UsuariController.actualitza)
router.delete('/:id', UsuariController.elimina)

module.exports = router