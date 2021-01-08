const sha256 = require('sha256')
const Cuenta = require('../../schemas/credencial.js')

module.exports = {
    ingreso: (req, res, next)=>{
        let usuario = req.body.usuario ? req.body.usuario : new Buffer(sha256(req.body.cid.replace(/\./g,''))).toString('base64')
        Cuenta.find({ 'Usuario.UID': usuario, 'Seguridad.Password': sha256(req.body.passw), 'Estado.EstadoCuenta': true }, (err, result)=>{
            if(err){
                res.status(500).send({ code: 500, error_type: "err_ingreso", error_message: err, data: {}, status: false })
            } else {
                if(result.length > 0){
                    req.datos = result[0].Usuario;
                    next();
                } else {
                    res.status(202).send({ code: 202, message: 'excepción_cuenta_no_verificada', data: {}, status: false })
                }
            }
        })
    },
}