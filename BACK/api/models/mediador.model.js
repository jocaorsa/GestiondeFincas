const mongoose= require('mongoose')
const Schema = mongoose.Schema

const mediadorSchema = new Schema ({
    name: {
        type: String
    },
    tlf_med: {
        type: String
    }
})

const Mediador = mongoose.model('mediador', mediadorSchema)
module.exports = Mediador