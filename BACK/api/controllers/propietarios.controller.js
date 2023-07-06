const Propietarios = require("../models/propietarios.model");

async function getPropietarios(req, res) {
    try {
        const propietarios = await Propietarios.findById(req.params.id)
        if (propietarios) {
            return res.status(200).json(propietarios)
        } else {
            return res.status(404).send('propietarios not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function getAllPropietarios(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const propietario = await Propietarios.findAll({ paranoid: false })
            if (propietario) {
                return res.status(200).json(propietario)
            } else {
                return res.status(404).send('No propietario found')
            }
        } else {
            const propietario = await Propietarios.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (propietario.length !== 0) {
                return res.status(200).json(propietario)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createPropietarios(req, res) {
    try {
        const propietario = await Propietarios.create({
            firstName: req.body.firstName,
        })
        return res.status(200).json({ message: 'Propietarios created', propietario: propietario })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updatePropietarios(req, res) {
    try {
        const [propietarioExist, propietario] = await Propietarios.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (propietarioExist !== 0) {
            return res.status(200).json({ message: 'Propietarios updated', propietario: propietario })
        } else {
            return res.status(404).send('Propietarios not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deletePropietarios(req, res) {
    try {
        const propietario = await Propietarios.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (propietario) {
            return res.status(200).json('Propietarios deleted')
        } else {
            return res.status(404).send('Propietarios not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
                getPropietarios,
                getAllPropietarios,
                createPropietarios,
                updatePropietarios,
                deletePropietarios} 
