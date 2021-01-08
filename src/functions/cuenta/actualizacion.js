const sha256 = require('sha256')
const Cuenta = require('../../schemas/credencial.js')

module.exports = {
    contacto: (req, res, next)=>{
        Cuenta.update({ 'Usuario.UID': req.body.uid },{ $set: { 'Usuario.Correo': req.body.correo, 'Usuario.Fono': req.body.fono  } }, (err, result)=>{
            if (err) {
                res.status(500).send({ code: 500, error_type: "err_actualizar_cuenta", error_message: err, data: {}, status: false })
            } else {
                if(result.n >= 1){
                    next()
                } else {
                    res.status(401).send({ code: 401, message: 'excepcion_actualizacion', data: {}, status: false })
                }
            }
        })
    },
    password: (req, res, next)=>{
        Cuenta.update({ 'Usuario.UID': req.body.uid, 'Seguridad.Password': sha256(req.body.passwdOld) },{ $set: { 'Seguridad.Password': sha256(req.body.passwdNew) } }, (err, result)=>{
            if (err) {
                res.status(500).send({ code: 500, error_type: "err_actualizar_cuenta", error_message: err, data: {}, status: false })
            } else {
                if(result.n >= 1){
                    next()
                } else {
                    res.status(401).send({ code: 401, message: 'excepcion_actualizacion_passwd', data: {}, status: false })
                }
            }
        })
    },
    media: (req, res, next)=>{
        Cuenta.update({ 'Usuario.UID': req.body.uid },{ $set: { 'Usuario.Media': req.body.media } }, (err, result)=>{
            if (err) {
                res.status(500).send({ code: 500, error_type: "err_actualizar_cuenta", error_message: err, data: {}, status: false })
            } else {
                if(result.n >= 1){
                    next()
                } else {
                    res.status(401).send({ code: 401, message: 'excepcion_actualizacion_passwd', data: {}, status: false })
                }
            }
        })
    }
}