const router = require('express').Router()

const{ getOneUser,
       getOneUsuario,
       getAllUsuario,
       createUsuario,
       updateUsuario,
       deleteUsuario
    } = require ('../controllers/usuario.controller')

router
    .get('/:usuarioId/all',getOneUser)
    .get('/', getAllUsuario)
    .get('/:usuarioId', getOneUsuario)
    
    .post('/', createUsuario)
    .put('/:usuarioId', updateUsuario)
    .delete('/:usuarioId', deleteUsuario)  
    
    module.exports = router
