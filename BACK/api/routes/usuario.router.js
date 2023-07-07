const router = require('express').Router()

const{ getOneUsuario,
       getAllUsuario,
       createUsuario,
       updateUsuario,
       deleteUsuario
    } = require ('../controllers/usuario.controller')

router
    .get('/:id', getOneUsuario)
    .get('/', getAllUsuario)
    .post('/', createUsuario)
    .put('/', updateUsuario)
    .delete('/:id', deleteUsuario)  
    
    module.exports = router
