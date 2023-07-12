const mongoose= require('mongoose')
const Schema = mongoose.Schema

const propietariosSchema = new Schema ({
    name: {
        type: String
    },
    apellidos: {
        type: String
    },
    tlf_prop: {
        type: String
    },
    email: {
        type: String
    },
    usuario_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    }],
    propiedad_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'propiedad'
    }]
})

const Propietarios = mongoose.model('propietarios', propietariosSchema)
module.exports = Propietarios