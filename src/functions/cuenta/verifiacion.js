const sha256 = require('sha256')
const Cuenta = require('../../schemas/credencial.js')

module.exports = {
    usuario: (req, res, next)=>{
        let usuario = req.body.usuario ? req.body.usuario : new Buffer(sha256(req.body.cid.replace(/\./g,''))).toString('base64')
        Cuenta.update({ 'Usuario.UID': usuario, 'Seguridad.Codigo': req.body.codigo },{ $set: { 'Estado.EstadoCuenta': true } }, (err, result)=>{
            if (err) {
                res.status(500).send({ code: 500, error_type: "err_activar", error_message: err, data: {}, status: false })
            } else {
                if(result.n >= 1){
                    next()
                } else {
                    res.status(401).send({ code: 401, message: 'exception_account_already_activated', data: {}, status: false })
                }
            }
        })
    }
}