const mongoose= require('mongoose')
const Schema = mongoose.Schema

const comunidadSchema = new Schema ({
    nombre: {
        type: String
    },
    direccion: {
        type: String
    },
    tlf_com: {
        type: String
    },
    cif: {
        type: String
    },
    per_contacto: {
        type: String
    },
    ascensor: {
        type: String
    },
    localizacion: {
        type: String
    },
    img: {
        type: String
    },
    seguro_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seguro'
    }]
})

const Comunidad = mongoose.model('comunidad', comunidadSchema)
module.exports = Comunidad