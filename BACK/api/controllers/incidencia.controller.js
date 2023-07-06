const Incidencia = require("../models/incidencia.model");

async function getIncidencia(req, res) {
    try {
        const incidencia = await Incidencia.findById(req.params.id)
        if (incidencia) {
            return res.status(200).json(incidencia)
        } else {
            return res.status(404).send('incidencia not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function getAllIncidencia(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const incidencia = await Incidencia.findAll({ paranoid: false })
            if (incidencia) {
                return res.status(200).json(incidencia)
            } else {
                return res.status(404).send('No incidencia found')
            }
        } else {
            const incidencia = await incidencia.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (incidencia.length !== 0) {
                return res.status(200).json(incidencia)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createIncidencia(req, res) {
    try {
        const incidencia = await Incidencia.create({
            firstName: req.body.firstName,
        })
        return res.status(200).json({ message: 'Incidencia created', incidencia: incidencia })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateIncidencia(req, res) {
    try {
        const [incidenciaExist, incidencia] = await Incidencia.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (incidenciaExist !== 0) {
            return res.status(200).json({ message: 'Incidencia updated', incidencia: incidencia })
        } else {
            return res.status(404).send('Incidencia not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteIncidencia(req, res) {
    try {
        const incidencia = await Incidencia.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (incidencia) {
            return res.status(200).json('Incidencia deleted')
        } else {
            return res.status(404).send('Incidencia not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
                getIncidencia,
                getAllIncidencia,
                createIncidencia,
                updateIncidencia,
                deleteIncidencia
            } 
