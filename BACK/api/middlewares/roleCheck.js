const checkAdmin = (req, res, next) => {
   
    if (res.locals.usuario.role === 'Admin') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};

const checkUser =  (req, res, next) => {
    if (res.locals.usuario.role === 'Admin' || res.locals.usuario.role === 'User') {
        next()
    } else {
        res.status(403).send('Access denied');
    }
};


module.exports = { checkAdmin, checkUser }
