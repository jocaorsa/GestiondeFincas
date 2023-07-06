const Seguro = require("../models/seguro.model");

async function getSeguro(req, res) {
    try {
        const seguro = await Seguro.findById(req.params.id)
        if (seguro) {
            return res.status(200).json(seguro)
        } else {
            return res.status(404).send('seguro not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getAllSeguro(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const seguro = await Seguro.findAll({ paranoid: false })
            if (seguro) {
                return res.status(200).json(seguro)
            } else {
                return res.status(404).send('No Seguro found')
            }
        } else {
            const seguro = await Seguro.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (seguro.length !== 0) {
                return res.status(200).json(seguro)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createSeguro(req, res) {
    try {
        const seguro = await Seguro.create({
            firstName: req.body.firstName,
        })
        return res.status(200).json({ message: 'Seguro created', seguro: seguro })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateSeguro(req, res) {
    try {
        const [seguroExist, seguro] = await Seguro.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (seguroExist !== 0) {
            return res.status(200).json({ message: 'Seguro updated', seguro: seguro })
        } else {
            return res.status(404).send('Seguro not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteSeguro(req, res) {
    try {
        const seguro = await Seguro.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (seguro) {
            return res.status(200).json('Seguro deleted')
        } else {
            return res.status(404).send('Seguro not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
                getSeguro,
                getAllSeguro,
                createSeguro,
                updateSeguro,
                deleteSeguro} 
