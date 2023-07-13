const router = require('express').Router()

const{ getOneMediador,
       getAllMediador,
       createMediador,
       updateMediador,
       deleteMediador
    } = require ('../controllers/mediador.controller')

router
    .get('/:mediadorId', getOneMediador)
    .get('/', getAllMediador)
    .post('/', createMediador)
    .put('/:mediadorId', updateMediador)
    .delete('/:mediadorId', deleteMediador)  
    
    module.exports =  router 