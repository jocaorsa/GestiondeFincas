const Usuario = require("../models/usuario.model");

async function getUser(req, res) {
    try {
        const user = await Usuario.findById(req.params.id)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).send('user not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
                getUser} 