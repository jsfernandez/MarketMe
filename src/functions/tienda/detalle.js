const sha256 = require('sha256')
//Importar schemas
const Tienda = require('../../schemas/tienda.js')

module.exports = {
    //Detalle tienda
    detalle: (req, res, next)=>{
        Tienda.find({ _id: req.body.tid }, (err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_detalle_tienda", error_message: err, data: {}, status: false })
            } else {
                if(result.length > 0){
                    req.datos = result[0]
                    next()
                } else {
                    res.status(202).send({ code: 202, message: 'excepción_detalle_tienda', data: {}, status: false })
                }
            }
        })
    },
    //Detalle tienda por usuario
    mistiendas: (req, res, next)=>{
        Tienda.find({ Propietario: req.body.uid }, (err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_detalle_tienda", error_message: err, data: {}, status: false })
            } else {
                if(result.length > 0){
                    req.datos = result
                    next()
                } else {
                    res.status(202).send({ code: 202, message: 'excepción_detalle_tienda', data: {}, status: false })
                }
            }
        })
    }
}