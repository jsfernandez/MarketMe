const mongoose = require('mongoose')

const Schema = mongoose.Schema

let cuentaSchema = new Schema({
    Usuario: {
        UID: String, Titular: String, Correo: String, Fono: String, Empresa: String, CID: String, Media: String
    },
    Grupo: {
        Nombre: String, GID: String
    },
    Otros: [{
        Nombre: String, OID: String
    }],
    Estado: {
        Registro: { type: Date, default: Date.now },
        EstadoCuenta: { type: Boolean, default: false }
    },
    Seguridad: {
        Password: String,
        Codigo: String,
        Origen: String,
        Sesion: { Ip: String, UltimoIngreso: Date, Vigente:  Boolean, Token: String },
    },
    Vinculos: {
        Metodo: { Plataforma: String, Id: String, Usuario: String, Estado: Boolean  }
    },
    Operaciones: [{
        Nombre: String,
        Estado: Boolean,
        Registro: Date
    }],
    Historial: [{
        Sesion: { Ip: String, Ingreso: Date, Token: String, Coordenadas: String }
    }]
})

let Cuenta = mongoose.model('Cuenta', cuentaSchema)

module.exports = Cuenta