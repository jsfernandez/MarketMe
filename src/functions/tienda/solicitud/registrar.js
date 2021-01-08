//Importar schemas
const Solicitud = require('../../../schemas/solicitud.js')

module.exports = {
    //Registro de Solicitud 
    registro: (req, res, next) => {
        let solicitudObj = {
            TID: req.body.tienda,
            SID: req.body.uid,
            Carro: req.body.carro,
            Delivery: req.body.delivery ? true : false,
            Direccion: req.body.delivery ? req.body.direccion : {},
            Comentario: req.body.comentario ? { Solicitante: [{ Comentario: req.body.comentario , Registro: new Date() }] }: {},
            Proceso: [{ Estado: "Iniciado", Registro: new Date() }]
        }
        let solicitud = Solicitud(solicitudObj);
        solicitud.save((err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_resgistro_solicitud", error_message: err, data: {}, status: false })
            } else {
                req.body.id = result._id
                next()
            }
        })
    }
}