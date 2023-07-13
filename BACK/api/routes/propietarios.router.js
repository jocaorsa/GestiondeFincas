const router = require('express').Router()

const{ getOnePropietarios,
       getAllPropietarios,
       createPropietarios,
       updatePropietarios,
       deletePropietarios
    } = require ('../controllers/propietarios.controller')

router
    .get('/:propietariosId', getOnePropietarios)
    .get('/', getAllPropietarios)
    .post('/', createPropietarios)
    .put('/:propietariosId', updatePropietarios)
    .delete('/:propietariosId', deletePropietarios)  
    
    module.exports = router