const mongoose= require('mongoose')
const Schema = mongoose.Schema

const usuarioSchema = new Schema ({
    name: {
        type: String
    },
    apellidos: {
        type: String
    },
    tlf_usu: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: {enum:['User','Admin']} 
    },
    comunidad_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comunidad'
    }]
})

const Usuario = mongoose.model('usuario', roleSchema)
module.exports = Usuario