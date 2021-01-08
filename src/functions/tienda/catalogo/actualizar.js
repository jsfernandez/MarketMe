//Schemas
const Catalogo = require('../../../schemas/tienda.js');
const mongoose = require('mongoose')

module.exports = {
    actualizar: (req, res, next)=>{
        try {
            Catalogo.update({ Propietario: req.body.uid },{ $set: { Catalogo: req.body.catalogo } }, (err, result)=>{
                if (err) {
                  res.status(500).send({ code: 500, error_type: "err_actualizar_actualizar_catalogo", error_message: err, data: {}, status: false })
                } else {
                    if(result.n >= 1){
                        next()
                    } else {
                        res.status(202).send({ code: 202, message: "excepcion_actualizar_catalogo", data: {}, status: false })
                    }
                }
            })
        } catch (err) {
            res.status(500).send({ code: 500, error_type: "err_actualizar_actualizar_catalogo", error_message: err, data: {}, status: false })
        }
    }
};