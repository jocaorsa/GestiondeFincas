const Propiedad = require("../models/propiedad.model");

async function getPropiedad(req, res) {
    try {
        const propiedad = await Propiedad.findById(req.params.id)
        if (propiedad) {
            return res.status(200).json(propiedad)
        } else {
            return res.status(404).send('propiedad not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllPropiedad(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const propiedades = await Propiedad.findAll({ paranoid: false })
            if (propiedades) {
                return res.status(200).json(propiedad)
            } else {
                return res.status(404).send('No Propiedad found')
            }
        } else {
            const propiedad = await Propiedad.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (propiedad.length !== 0) {
                return res.status(200).json(propiedad)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createPropiedad(req, res) {
    try {
        const propiedad = await Propiedad.create({
            firstName: req.body.firstName,
        })
        return res.status(200).json({ message: 'Propiedad created', propiedad: propiedad })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updatePropiedad(req, res) {
    try {
        const [propiedadExist, propiedad] = await Propiedad.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (propiedadExist !== 0) {
            return res.status(200).json({ message: 'Propiedad updated', propiedad: propiedad })
        } else {
            return res.status(404).send('Propiedad not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deletePropiedad(req, res) {
    try {
        const propiedad = await Propiedad.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (propiedad) {
            return res.status(200).json('Propiedad deleted')
        } else {
            return res.status(404).send('Propiedad not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
                getPropiedad,
                getAllPropiedad,
                createPropiedad,
                updatePropiedad,
                deletePropiedad} 