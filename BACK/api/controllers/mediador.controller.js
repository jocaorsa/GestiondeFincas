const Mediador = require("../models/mediador.model");

async function getMediador(req, res) {
    try {
        const mediador = await Mediador.findById(req.params.id)
        if (mediador) {
            return res.status(200).json(mediador)
        } else {
            return res.status(404).send('mediador not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function getAllMediador(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const mediador = await Mediador.findAll({ paranoid: false })
            if (mediador) {
                return res.status(200).json(mediador)
            } else {
                return res.status(404).send('No Mediador found')
            }
        } else {
            const mediador = await Mediador.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (mediador.length !== 0) {
                return res.status(200).json(mediador)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createMediador(req, res) {
    try {
        const mediador = await Mediador.create({
            firstName: req.body.firstName,
        })
        return res.status(200).json({ message: 'Mediador created', mediador: mediador })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateMediador(req, res) {
    try {
        const [mediadorExist, mediador] = await Mediador.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (mediadorExist !== 0) {
            return res.status(200).json({ message: 'Mediador updated', mediador: mediador })
        } else {
            return res.status(404).send('Mediador not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteMediador(req, res) {
    try {
        const mediador = await Mediador.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (mediador) {
            return res.status(200).json('Mediador deleted')
        } else {
            return res.status(404).send('Mediador not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
                getMediador,
                getAllMediador,
                createMediador,
                updateMediador,
                deleteMediador} 
