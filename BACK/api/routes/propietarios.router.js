const router = require('express').Router()

const{ getOnePropietarios,
       getAllPropietarios,
       createPropietarios,
       updatePropietarios,
       deletePropietarios
    } = require ('../controllers/propietarios.controller')

router
    .get('/:id', getOnePropietarios)
    .get('/', getAllPropietarios)
    .post('/', createPropietarios)
    .put('/', updatePropietarios)
    .delete('/:id', deletePropietarios)  
    
    module.exports = router