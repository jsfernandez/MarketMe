const sha256 = require('sha256')
const Cuenta = require('../../schemas/credencial.js')

module.exports = {
    //Revisar existencia del usuario previo a registro **
    cuenta: (req, res, next)=>{
        Cuenta.find({ 'Usuario.UID': req.body.uid, 'Estado.EstadoCuenta': true }, (err, result) => {
            if(err){
                res.status(500).send({ code: 500, error_type: "err_ingreso", error_message: err, data: {}, status: false });
            } else {
                if(result.length > 0){
                    req.datos = result[0].Usuario;
                    req.datos.UID = sha256(req.datos.UID);
                    next();
                } else {
                    res.status(202).send({ code: 202, message: 'excepción_cuenta_no_verificada', data: {}, status: false });
                }
            }
        })
    },
}