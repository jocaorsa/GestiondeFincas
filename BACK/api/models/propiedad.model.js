const mongoose= require('mongoose')
const Schema = mongoose.Schema

const propiedadSchema = new Schema ({
    tipo_propiedad: {
        type: String
    },
    piso: {
        type: String
    },
    num: {
        type: String
    },
    letra: {
        type: String
    },
    comunidad_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comunidad'
    }]
})

const Propiedad = mongoose.model('propiedad', propiedadSchema)
module.exports = Propiedad