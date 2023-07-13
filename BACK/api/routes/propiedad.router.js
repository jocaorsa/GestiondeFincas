const router = require('express').Router()

const{ getOnePropiedad,
       getAllPropiedad,
       createPropiedad,
       updatePropiedad,
       deletePropiedad
    } = require ('../controllers/propiedad.controller')

router
    .get('/:propiedadId', getOnePropiedad)
    .get('/', getAllPropiedad)
    .post('/', createPropiedad)
    .put('/:propiedadId', updatePropiedad)
    .delete('/:propiedadId', deletePropiedad)  
    
    module.exports = router