const sha256 = require('sha256')
//Importar schemas
const Tienda = require('../../schemas/tienda.js')

module.exports = {
    //Revisar existencia de la tienda previa a registro **
    existencia: (req, res, next) => {
        Tienda.find({ Propietario: req.body.uid }, (err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_existencia", error_message: err, data: {}, status: false })
            } else {
                if(result.length > 0){
                    res.status(202).send({ code: 202, message: 'excepción_tienda_registrada', data: {}, status: false })
                } else {
                    next()
                }
            }
        })
    },
    //Registro de Tienda 
    registro: (req, res, next) => {
        let tiendaObj = {
            Propietario:  req.body.uid,
            Titulo:  req.body.titulo,
            Descripcion:  req.body.descripcion,
            Tag: req.body.tag,
            Empresas: req.body.empresa,
            'Ubicacion.Coordenadas': req.body.coordenadas
        }
        let tienda = Tienda(tiendaObj);
        tienda.save((err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_resgistro_tienda", error_message: err, data: {}, status: false });
            } else {
                req.body.tid = result._id
                next()
            }
        })
    }
}