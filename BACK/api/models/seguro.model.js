const mongoose= require('mongoose')
const Schema = mongoose.Schema

const seguroSchema = new Schema ({
    compania: {
        type: String
    },
    poliza: {
        type: String
    },
    tlf_seg: {
        type: String
    },
    fecha_contrato: {
        type: String
    },
    fecha_fin_contrato: {
        type: String
    },
    mediador_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mediador'
    }]
})

const Seguro = mongoose.model('seguro', seguroSchema)
module.exports = Seguro