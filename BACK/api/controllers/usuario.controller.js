const Usuario = require("../models/usuario.model");

async function getUsuario(req, res) {
    try {
        const usuario = await Usuario.findById(req.params.id)
        if (usuario) {
            return res.status(200).json(usuario)
        } else {
            return res.status(404).send('usuario not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllUsuarios(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const usuarios = await Usuarios.findAll({ paranoid: false })
            if (usuarios) {
                return res.status(200).json(usuarios)
            } else {
                return res.status(404).send('No usuarios found')
            }
        } else {
            const usuarios = await Usuarios.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (usuarios.length !== 0) {
                return res.status(200).json(usuarios)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createUsuario(req, res) {
    try {
        const usuario = await Usuario.create({
            firstName: req.body.firstName,
        })
        return res.status(200).json({ message: 'usuario created', usuario: usuario })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateUsuario(req, res) {
    try {
        const [usuarioExist, usuario] = await Usuario.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (usuarioExist !== 0) {
            return res.status(200).json({ message: 'usuario updated', usuario: usuario })
        } else {
            return res.status(404).send('usuario not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteUsuario(req, res) {
    try {
        const usuario = await Usuario.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (usuario) {
            return res.status(200).json('usuario deleted')
        } else {
            return res.status(404).send('usuario not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}




module.exports = {
                getUsuario,
                getAllUsuarios,
                createUsuario,
                updateUsuario,
                deleteUsuario} 