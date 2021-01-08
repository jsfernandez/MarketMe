const Solicitud = require('../../../schemas/solicitud.js')
module.exports = {
    solicitanteProceso: (req, res, next)=>{
        if (req.body.estado) {
            Solicitud.update({ _id: req.body.id, SID: req.body.uid },
            { $push:  { Proceso: { Estado: req.body.estado, Registro: new Date() } } }, (err, result) => {
                if (err) {
                    res.status(500).send({ code: 500, error_type: "err_actualizar_solicitud_sp", error_message: err, data: {}, status: false })
                } else {
                    if(result.n >= 1){
                        next()
                    } else {
                        res.status(401).send({ code: 401, message: 'excepcion_actualizacion_sp', data: {}, status: false })
                    }
                }
            });
        } else {
            next();
        }
    },
    solicitanteComentario: (req, res, next)=>{
        if (req.body.comentario) {
            Solicitud.update({ _id: req.body.id, SID: req.body.uid },
            { $push:  { "Comentario.Solicitante": { Comentario: req.body.comentario, Registro: new Date() } } }, (err, result) => {
                if (err) {
                        res.status(500).send({ code: 500, error_type: "err_actualizar_solicitud_sc", error_message: err, data: {}, status: false })
                } else {
                    if(result.n >= 1){
                        next()
                    } else {
                        res.status(401).send({ code: 401, message: 'excepcion_actualizacion_sc', data: {}, status: false })
                    }
                }
            });
        } else {
            next();
        }
    },
    solicitanteValoracion: (req, res, next)=>{
        if (req.body.valoracion) {
            Solicitud.update({ _id: req.body.id, SID: req.body.uid },
            { $set: { Valoracion: req.body.valoracion } }, (err, result) => {
                if (err) {
                    res.status(500).send({ code: 500, error_type: "err_actualizar_solicitud_sv", error_message: err, data: {}, status: false })
                } else {
                    if(result.n >= 1){
                        next()
                    } else {
                        res.status(401).send({ code: 401, message: 'excepcion_actualizacion_sv', data: {}, status: false })
                    }
                }
            });
        } else {
            next();
        }
    },
    propietarioProceso: (req, res, next)=>{
        if (req.body.estado) {
            Solicitud.update({ _id: req.body.id, TID: req.body.tid },
            { $push:  { Proceso: { Estado: req.body.estado, Registro: new Date() } } }, (err, result) => {
                if (err) {
                    res.status(500).send({ code: 500, error_type: "err_actualizar_solicitud_pp", error_message: err, data: {}, status: false })
                } else {
                    if(result.n >= 1){
                        next()
                    } else {
                        res.status(401).send({ code: 401, message: 'excepcion_actualizacion_pp', data: {}, status: false })
                    }
                }
            });
        } else {
            next();
        }
    },
    propietarioComentario: (req, res, next)=>{
        if (req.body.comentario) {
            Solicitud.update({ _id: req.body.id, TID: req.body.tid },
            { $push:  { "Comentario.Propietario": { Comentario: req.body.comentario, Registro: new Date() } } }, (err, result) => {
                if (err) {
                    res.status(500).send({ code: 500, error_type: "err_actualizar_solicitud_pc", error_message: err, data: {}, status: false })
                } else {
                    if(result.n >= 1){
                        next()
                    } else {
                        res.status(401).send({ code: 401, message: 'excepcion_actualizacion_pc', data: {}, status: false })
                    }
                }
            });
        } else {
            next();
        }
    },
}