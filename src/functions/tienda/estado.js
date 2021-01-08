const sha256 = require('sha256')
//Importar schemas
const Tienda = require('../../schemas/tienda.js')
module.exports = {
    //Actualizar tienda a estado deshabilitado
    deshabilitar: (req, res, next) => {
        Tienda.update({ Propietario: req.body.uid },{ $set: { Estado: false } }, function(err, result){
            if (err) {
                res.status(500).send({ code: 500, error_type: "err_deshabilitar_tienda", error_message: err, data: {}, status: false })
            } else {
                if(result.n >= 1){
                    next()
                } else {
                    res.status(401).send({ code: 401, message: 'excepcion_deshabilitar_tienda', data: {}, status: false })
                }
            }
        })
    },
    //Actualizar tienda a estado habilitado
    habilitar: (req, res, next) => {
        Tienda.update({ Propietario: req.body.uid },{ $set: { Estado: true } }, function(err, result){
            if (err) {
                res.status(500).send({ code: 500, error_type: "err_habilitar_tienda", error_message: err, data: {}, status: false })
            } else {
                if(result.n >= 1){
                    next()
                } else {
                    res.status(401).send({ code: 401, message: 'excepcion_habilitar_tienda', data: {}, status: false })
                }
            }
        })
    }        
}