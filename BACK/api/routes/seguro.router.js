const router = require('express').Router()

const{ getOneSeguro,
       getAllSeguro,
       createSeguro,
       updateSeguro,
       deleteSeguro
    } = require ('../controllers/seguro.controller')

router
    .get('/:id', getOneSeguro)
    .get('/', getAllSeguro)
    .post('/', createSeguro)
    .put('/', updateSeguro)
    .delete('/:id', deleteSeguro)  
    
    module.exports = router