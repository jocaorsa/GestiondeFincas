const mongoose= require('mongoose')
const Schema = mongoose.Schema

const incidenciaSchema = new Schema ({
    num_incidencia: {
        type: String
    },
    comunidad_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comunidad'
    },
    propiedad_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'propiedad'
    }],
    fecha_creacion: {
        type: Date
    },
    seguro: {
        type: String,
        enum:['Si','No']
    },
    estado: {
        type: String,
        enum:['Nueva','En Proceso',"Terminada"]
    },
    descripcion: {
        type: String
    },
    img: {
        type: String
    },
    proveedor_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proveedor'
    }] 
})

const Incidencia = mongoose.model('incidencia', incidenciaSchema)
module.exports = Incidencia