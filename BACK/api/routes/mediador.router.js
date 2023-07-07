const router = require('express').Router()

const{ getOneMediador,
       getAllMediador,
       createMediador,
       updateMediador,
       deleteMediador
    } = require ('../controllers/mediador.controller')

router
    .get('/:id', getOneMediador)
    .get('/', getAllMediador)
    .post('/', createMediador)
    .put('/', updateMediador)
    .delete('/:id', deleteMediador)  
    
    module.exports =  router 