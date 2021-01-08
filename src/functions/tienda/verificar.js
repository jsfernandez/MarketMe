const sha256 = require('sha256')
const Tienda = require('../../schemas/tienda.js')

module.exports = {
    propietario: (req, res, next)=>{
        Tienda.find({ _id: req.body.tid, Propietario: req.body.uid }, (err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_listado_tienda", error_message: err, data: {}, status: false })
            } else {
                if(result.length > 0){
                    next()
                } else {
                    res.status(202).send({ code: 202, message: 'excepción_datos_incorrectos', data: {}, status: false })
                }
            }
        })
    }
}