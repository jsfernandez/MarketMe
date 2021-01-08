const Solicitud = require('../../../schemas/solicitud.js')
module.exports = {
    solicitud: (req, res, next)=>{
        Solicitud.find({ SID: req.body.uid }, null, { sort: { "Proceso.Registro": -1 }}, (err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_fase1_solicitud", error_message: err, data: {}, status: false })
            } else {
                if(result.length > 0){
                    req.datos = result
                    next()
                } else {
                    res.status(202).send({ code: 202, message: 'excepción______', data: {}, status: false })
                }
            }
        })
    },
    tienda: (req, res, next)=>{
        Solicitud.find({ TID: req.body.tid }, null, { sort: { "Proceso.Registro": -1 }}, (err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_fase1_solicitud", error_message: err, data: {}, status: false })
            } else {
                if(result.length > 0){
                    req.datos = result
                    next()
                } else {
                    res.status(202).send({ code: 202, message: 'excepción______', data: {}, status: false })
                }
            }
        })
    },
}