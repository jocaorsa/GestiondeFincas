const router = require('express').Router()

const{ getOneIncidencia,
       getAllIncidencia,
       createIncidencia,
       updateIncidencia,
       deleteIncidencia,
       getAllIncidenciaAll
    } = require ('../controllers/incidencia.controller')

router
    .get('/', getAllIncidencia)
    .get('/all', getAllIncidenciaAll)
    .get('/:incidenciaId', getOneIncidencia)
     
    .post('/', createIncidencia)
    .put('/:incidenciaId', updateIncidencia)
    .delete('/:incidenciaId', deleteIncidencia)  
    
    module.exports = router
