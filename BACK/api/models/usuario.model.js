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
        type: String,
        enum:["Admin", "User"]
    }
    //,
    //comunidad_id:[{
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'comunidad'
    //}]
})

const Usuario = mongoose.model('usuario', usuarioSchema)
module.exports = Usuario