const mongoose= require('mongoose')
const Schema = mongoose.Schema

const proveedorSchema = new Schema ({
    nombre: {
        type: String
    },
    direccion: {
        type: String
    },
    tlf_prov: {
        type: String
    },
    cif: {
        type: String
    },
    per_contacto: {
        type: String
    },
    email: {
        type: String
    },
    puntuacion: {
        type: String
    },
    servicio: {
        type: String,
        enum:[
            'Fontaneria',
            'Carpinteria',
            'Electricidad',
            'Limpieza',
            'Obra'] 
    }
})


const Proveedor = mongoose.model('proveedor', proveedorSchema)
module.exports = Proveedor