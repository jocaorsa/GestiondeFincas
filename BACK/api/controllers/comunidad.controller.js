const Comunidad = require("../models/comunidad.model");



async function getComunidad(req, res) {
    try {
        const comunidad = await Comunidad.findById(req.params.id)
        if (comunidad) {
            return res.status(200).json(comunidad)
        } else {
            return res.status(404).send('Comunidad not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function getAllComunidad(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const comunidades = await Comunidad.findAll({ paranoid: false })
            if (comunidades) {
                return res.status(200).json(comunidades)
            } else {
                return res.status(404).send('No Comunidad found')
            }
        } else {
            const comunidades = await Comunidad.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (comunidades.length !== 0) {
                return res.status(200).json(comunidades)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createComunidad(req, res) {
    try {
        const comunidad = await Comunidad.create({
            firstName: req.body.firstName,
        })
        return res.status(200).json({ message: 'Comunidad created', comunidad: comunidad })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateComunidad(req, res) {
    try {
        const [comunidadExist, comunidad] = await Comunidad.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (comunidadExist !== 0) {
            return res.status(200).json({ message: 'Comunidad updated', comunidad: comunidad })
        } else {
            return res.status(404).send('Comunidad not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteComunidad(req, res) {
    try {
        const comunidad = await Comunidad.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (comunidad) {
            return res.status(200).json('Comunidad deleted')
        } else {
            return res.status(404).send('Comunidad not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}



module.exports = {
                getComunidad,
                getAllComunidad,
                createComunidad,
                updateComunidad,
                deleteComunidad} 