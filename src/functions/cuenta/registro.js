const sha256 = require('sha256')
const Cuenta = require('../../schemas/credencial.js')

module.exports = {
    existencia: (req, res, next)=>{
        try {
            let usuario = req.body.usuario ? req.body.usuario : new Buffer(sha256(req.body.cid.replace(/\./g,''))).toString('base64')
            Cuenta.find({ 'Usuario.UID': usuario }, (err, result)=>{
                if(err){
                    res.status(500).send({ code: 500, error_type: "err_existencia", error_message: err, data: {}, status: false })
                } else {
                    if(result.length > 0){
                        res.status(202).send({ code: 202, message: 'excepción_cuenta_registrada', data: {}, status: false })
                    } else {
                        next()
                    }
                }
            })
        } catch (err) {
            res.status(500).send({ code: 500, error_type: "err_existencia", error_message: err, data: {}, status: false })
        }
        
    },
    registro: (req, res, next)=>{
        try {
            let header =  Math.floor((Math.random() * 8999) + 1000)
            let tail = Math.floor((Math.random() * 8999) + 1000)
            let usuario = req.body.usuario ? req.body.usuario : new Buffer(sha256(req.body.cid.replace(/\./g,''))).toString('base64')
            let cuentaObj = {
                Usuario: {
                    UID: usuario,
                    Titular: req.body.titular, 
                    Correo: req.body.correo, 
                    Fono: req.body.fono, 
                    Empresa: req.body.empresa,
                    CID: req.body.cid ? req.body.cid.replace(/\./g,'') : ""
                },
                Grupo: {
                    Nombre: req.body.grupo, 
                    GID: req.body.gid
                },
                Seguridad: {
                    Password: sha256(req.body.passw),
                    Token: sha256(header + '/' + req.ip + '/' + tail),
                    Codigo: Math.floor((Math.random() * 8999) + 1000),
                    Origen: req.ip,
                },
                Vinculos: {
                    Metodo: req.body.vinculo
                }
            }
            let cuenta = Cuenta(cuentaObj);
            cuenta.save((err, result)=>{
                if(err){
                    res.status(500).send({ code: 500, error_type: "err_resgistro", error_message: err, data: {}, status: false })
                } else {
                    req.body.id = result._id
                    next()
                }
            })
        } catch (err) {
            res.status(500).send({ code: 500, error_type: "err_resgistro", error_message: err.stack, data: {}, status: false })
        }
    }
}