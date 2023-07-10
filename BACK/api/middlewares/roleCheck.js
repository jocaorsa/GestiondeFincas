const checkAdmin = (req, res, next) => {
   
    if (res.locals.usuario.role === 'Admin') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};

const checkUsuario =  (req, res, next) => {
    if (res.locals.usuario.role === 'Admin' || res.locals.usuario.role === 'Usuario') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};


module.exports = { checkAdmin, checkUsuario }
