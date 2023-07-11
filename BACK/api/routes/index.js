const router = require('express').Router()
//const router = require('./usuario.route')


router.use ('/auth', require('./auth.router'))
router.use('/usuario', require('./usuario.router'))
//router.use('/seguro', require('./seguro.router'))
//router.use('/proveedor', require('./proveedor.router'))
//router.use('/propiedad', require('./propiedad.router'))
//router.use('/propietarios', require('./propietarios.router'))
//router.use('/mediador', require('./mediador.router'))
router.use('/incidencia', require('./incidencia.router'))
//router.use('/comunidad', require('./comunidad.router'))

 module.exports =  router