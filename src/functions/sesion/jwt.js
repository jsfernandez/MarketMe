const jwt = require('jsonwebtoken');

module.exports = {
    comprobar: (req, res, next) => {
        let token = req.headers['x-access-token'];
        if(!token){
            res.status(401).send({ auth: false, message: 'Proceso no completado...'});
        } else {
            jwt.verify(token, process.env.SECRET, (err, decoded)=>{
                if (err) {
                    res.status(401).send({ auth: false, message: 'Proceso no completado...'});
                } else {
                    req.body.uid = decoded.uid
                    next();
                }
            });
        }
    },
    generar: (req, res, next) => {
        if (req.datos.UID) {
            let token = { Token: jwt.sign({ uid: req.datos.UID }, process.env.SECRET, { expiresIn: 86400 }) };
            req.result = Object.assign(token, req.datos);
            delete req.result.UID;
            delete req.result.$init;
            next();
        } else {
            res.status(400).send({ code: 400, message: 'Solicitud invalida'})
        }
    }
}