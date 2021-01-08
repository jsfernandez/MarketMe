const mongoose = require('mongoose')

const Schema = mongoose.Schema

let tiendaSchema = new Schema({
    TID: String,
    Propietario: String,
    Titulo: String,
    Descripcion: String,
    Ubicacion: { Coordenadas: String, Direccion: String },
    Tag: [ String ],
    Empresas: {
        Rut: String,
        Razon: String,
        Fono: String,
        Giro: String,
        Direccion: String
    },
    Catalogo: [{
        CID: String,
        Tipo: String,
        Nombre: String,
        Marca: String,
        Descripcion: String,
        Valor: Number,
        Cantidad: Number,
        Media: [{
            Data: String,
            Registro: Date,
            Oculto: { type: Boolean, default: false }
        }],
        Stock: Number,
        Promocion: { Estado: { default: false, type: Boolean }, Porcentaje: { default: 0, type: Number }, Actualizado: Date },
        Disponiblidad: { type: Boolean, default: true },
        Registro: { type: Date, default: Date.now },
    }],
    Estado: { type: Boolean, default: true },
    Registro: { type: Date, default: Date.now },
    Historial: [{
        Actualizacion: Date,
        Motivo: String
    }],
    Delivery: { type: Boolean, default: true },
    Subscripcion: [{ Inicio: Date, Duracion: Number, Estado: Boolean }]
})

let Tienda = mongoose.model('Tienda', tiendaSchema)

module.exports = Tienda