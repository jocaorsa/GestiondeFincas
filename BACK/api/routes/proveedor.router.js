const router = require('express').Router()

const{ getOneProveedor,
       getAllProveedor,
       createProveedor,
       updateProveedor,
       deleteProveedor
    } = require ('../controllers/proveedor.controller')

router
    .get('/:id', getOneProveedor)
    .get('/', getAllProveedor)
    .post('/', createProveedor)
    .put('/', updateProveedor)
    .delete('/:id', deleteProveedor)  
    
    module.exports = router