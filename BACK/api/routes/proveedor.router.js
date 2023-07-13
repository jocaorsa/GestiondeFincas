const router = require('express').Router()

const{ getOneProveedor,
       getAllProveedor,
       createProveedor,
       updateProveedor,
       deleteProveedor
    } = require ('../controllers/proveedor.controller')

router
    .get('/:proveedorId', getOneProveedor)
    .get('/', getAllProveedor)
    .post('/', createProveedor)
    .put('/:proveedorId', updateProveedor)
    .delete('/:proveedorId', deleteProveedor)  
    
    module.exports = router