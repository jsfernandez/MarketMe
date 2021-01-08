const sha256 = require('sha256')
//Importar schemas
const Tienda = require('../../schemas/tienda.js')
module.exports = {
    //Actualizar tienda
    tienda: (req, res, next)=>{
        Tienda.update({ Propietario: req.body.uid },{ $set: { 
            Titulo:  req.body.titulo,
            Descripcion:  req.body.descripcion,
            Ubicacion: req.body.ubicacion,
            Tag: req.body.tag,
            Delivery: req.body.delivery ? true :  false,
            'Empresas.Rut': req.body.empresa.Rut,
            'Empresas.Fono': req.body.empresa.Fono,
            'Empresas.Giro': req.body.empresa.Giro,
            'Empresas.Direccion': req.body.empresa.Direccion
        } }, (err, result) => {
            if (err) {
                res.status(500).send({ code: 500, error_type: "err_actualizar_tienda", error_message: err, data: {}, status: false })
            } else {
                if(result.n >= 1){
                    next()
                } else {
                    res.status(401).send({ code: 401, message: 'excepcion_actualizacion', data: {}, status: false })
                }
            }
        })
    }    
}