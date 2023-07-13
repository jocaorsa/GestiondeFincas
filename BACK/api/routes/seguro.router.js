const router = require('express').Router()

const{ getOneSeguro,
       getAllSeguro,
       createSeguro,
       updateSeguro,
       deleteSeguro
    } = require ('../controllers/seguro.controller')

router
    .get('/:seguroId', getOneSeguro)
    .get('/', getAllSeguro)
    .post('/', createSeguro)
    .put('/:seguroId', updateSeguro)
    .delete('/:seguroId', deleteSeguro)  
    
    module.exports = router