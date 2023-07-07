const router = require('express').Router()

const{ getOneIncidencia,
       getAllIncidencia,
       createIncidencia,
       updateIncidencia,
       deleteIncidencia
    } = require ('../controllers/incidencia.controller')

router
    .get('/:id', getOneIncidencia)
    .get('/', getAllIncidencia)
    .post('/', createIncidencia)
    .put('/', updateIncidencia)
    .delete('/:id', deleteIncidencia)  
    
    module.exports = router
