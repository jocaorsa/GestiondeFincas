const router = require('express').Router()

const{ getOneComunidad,
       getAllComunidad,
       createComunidad,
       updateComunidad,
       deleteComunidad
    } = require ('../controllers/comunidad.controller')

    router
        .get('/:comunidadId', getOneComunidad)
        .get('/', getAllComunidad)
        .post('/', createComunidad)
        .put('/:comunidadId', updateComunidad)
        .delete('/:comunidadId', deleteComunidad)  
    
    module.exports = router 