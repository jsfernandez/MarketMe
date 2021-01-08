const sha256 = require('sha256')
const Tienda = require('../../schemas/tienda.js')

module.exports = {
    listar: (req, res, next)=>{
        Tienda.find({ }, (err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_listado_tienda", error_message: err, data: {}, status: false })
            } else {
                if(result.length > 0){
                    req.datos = result
                    next()
                } else {
                    res.status(202).send({ code: 202, message: 'excepción_detalle_tienda', data: {}, status: false })
                }
            }
        })
    },
    buscar: (req, res, next) => {
        if (req.body.values) {
            let arrayOfTags = req.body.values.replace(/\ y /g,' ').replace(/\./g,'').replace(/\,/g,'').split(" ");
            Tienda.find({}, (err, result) => {
                if(err){
                    res.status(500).send({ code: 500, error_type: "err_buscar_tienda", error_message: err, data: {}, status: false })
                } else {
                    if(result.length > 0){
                        let arreglo = arrayOfTags.map(v=>{
                            let x = result.filter(b=>{if(b.Descripcion.toLowerCase().indexOf(v.toLowerCase()) >= 0) return b;}, v);
                            return x;
                        })
                        req.datos = arreglo.filter(f=>{ return f.length > 0 });
                        next()
                    } else {
                        res.status(202).send({ code: 202, message: 'excepción_detalle_tienda', data: {}, status: false })
                    }      
                }
            });
        } else {
            res.status(401).send({ code: 401, message: 'excepcion_actualizacion_passwd', data: {}, status: false })
        }
    },
    buscarPorTags: (req, res, next) => {
        if (req.body.values) {
            let arrayOfTags = req.body.values.replace(/\ y /g,' ').replace(/\./g,'').replace(/\,/g,'').toUpperCase().split(" ");
            Tienda.find({ Tag: { "$in" : arrayOfTags }}, (err, result) => {
                if(err){
                    res.status(500).send({ code: 500, error_type: "err_buscar_tienda", error_message: err, data: {}, status: false })
                } else {
                    if(result.length > 0){
                        req.datos = result
                        next()
                    } else {
                        res.status(202).send({ code: 202, message: 'excepción_detalle_tienda', data: {}, status: false })
                    }      
                }
            });
        } else {
            res.status(401).send({ code: 401, message: 'excepcion_actualizacion_passwd', data: {}, status: false })
        }
    }
}