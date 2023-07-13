const router = require('express').Router()

const{ getOneIncidencia,
       getAllIncidencia,
       createIncidencia,
       updateIncidencia,
       deleteIncidencia
    } = require ('../controllers/incidencia.controller')

router
    .get('/:incidenciaId', getOneIncidencia)
    .get('/', getAllIncidencia)
    .post('/', createIncidencia)
    .put('/:incidenciaId', updateIncidencia)
    .delete('/:incidenciaId', deleteIncidencia)  
    
    module.exports = router
