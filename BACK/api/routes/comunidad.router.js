const router = require('express').Router()

const{ getOneComunidad,
       getAllComunidad,
       createComunidad,
       updateComunidad,
       deleteComunidad
    } = require ('../controllers/comunidad.controller')

    router
        .get('/:id', getOneComunidad)
        .get('/', getAllComunidad)
        .post('/', createComunidad)
        .put('/', updateComunidad)
        .delete('/:id', deleteComunidad)  
    
    module.exports = router 