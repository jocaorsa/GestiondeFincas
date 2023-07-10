const jwt = require('jsonwebtoken')
const Usuario = require('../api/models/usuario.models')

const checkAuth = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(500).send('Error: Token not valid')
    }
    jwt.verify(req.headers.token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(500).send('Error: Token not valid')
        }
                const usuario = await Usuario.findOne({ where: { email: data.email } })

        if (!user) {
            return res.status(500).send('Error: Token not valid')
        }
        res.locals.usuario = usuario
        console.log("Check Auth")
        next()
    })
}

const checkAdmin = (req, res, next) => {           
    if (res.locals.usuario.role === 'Admin') {
        next()     
    } else {
        res.status(403).send('Access denied');
    }
};

const checkUsuario = (req, res, next) => {    
    if (res.locals.usuario.role != 'Usuario') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};


module.exports = { checkAuth, checkAdmin, checkUsuario }