const Proveedor = require("../models/proveedor.model");

async function getProveedor(req, res) {
    try {
        const proveedor = await Proveedor.findById(req.params.id)
        if (proveedor) {
            return res.status(200).json(proveedor)
        } else {
            return res.status(404).send('proveedor not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function getAllProveedor(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const proveedor = await Proveedor.findAll({ paranoid: false })
            if (proveedor) {
                return res.status(200).json(proveedor)
            } else {
                return res.status(404).send('No proveedor found')
            }
        } else {
            const proveedor = await Proveedor.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            })
            if (proveedor.length !== 0) {
                return res.status(200).json(proveedor)
            } else {
                return res.status(404).send('No matches found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function createProveedor(req, res) {
    try {
        const proveedor = await Proveedor.create({
            firstName: req.body.firstName,
        })
        return res.status(200).json({ message: 'Proveedor created', proveedor: proveedor })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateProveedor(req, res) {
    try {
        const [proveedorExist, proveedor] = await Proveedor.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (proveedorExist !== 0) {
            return res.status(200).json({ message: 'Proveedor updated', proveedor: proveedor })
        } else {
            return res.status(404).send('Proveedor not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteProveedor(req, res) {
    try {
        const proveedor = await Proveedor.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (proveedor) {
            return res.status(200).json('Proveedor deleted')
        } else {
            return res.status(404).send('Proveedor not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
                getProveedor,
                getAllProveedor,
                createProveedor,
                updateProveedor,
                deleteProveedor} 
