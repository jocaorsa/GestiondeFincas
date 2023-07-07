const router = require('express').Router()

const{ getOnePropiedad,
       getAllPropiedad,
       createPropiedad,
       updatePropiedad,
       deletePropiedad
    } = require ('../controllers/propiedad.controller')

router
    .get('/:id', getOnePropiedad)
    .get('/', getAllPropiedad)
    .post('/', createPropiedad)
    .put('/', updatePropiedad)
    .delete('/:id', deletePropiedad)  
    
    module.exports = router