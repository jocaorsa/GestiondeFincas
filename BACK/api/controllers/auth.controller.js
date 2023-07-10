const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.model')

const signup = async (req, res) => {
console.log(typeof req.body.phone)
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const usuario = await Usuario.create(req.body)
        console.log(usuario)
        const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).json({ token })
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error creating usuario')
    }
}


const login = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.body.email })
        console.log(usuario)
        if (!usuario) {
            return res.status(400).send('email or password incorrect')
        }
        bcrypt.compare(req.body.password, usuario.password, (err, result) => {

            if (err || !result) {
                return res.status(400).send('email or password incorrect')
            }

/*TOKEN*/   const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
/*ROLE*/    const role = usuario.role
/*ID*/      const id = usuario.id
            return res.status(200).json({ token, role, id})
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error: Cannot log in')
    }
}

module.exports = {
    signup,
    login
}
