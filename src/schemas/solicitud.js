const mongoose = require('mongoose')

const Schema = mongoose.Schema

let solicitudSchema = new Schema({
    TID: String,
    SID: String,
    Carro: [{ _CID: String, CID: String, Cantidad: Number, Valor: Number }],
    Proceso: [{ Estado: String, Registro: Date }],
    Valoracion: Number,
    Comentario: {
        Propietario: [{ Comentario: String, Registro: Date }],
        Solicitante: [{ Comentario: String, Registro: Date }],
    },
    Delivery: { type: Boolean, default: false },
    Direccion: { Coordenadas: String, Valor: String }
})

let Solicitud = mongoose.model('Solicitud', solicitudSchema)

module.exports = Solicitud