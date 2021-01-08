const { Router } = require('express');
const router = Router();

const RegistroCuenta =  require('../functions/cuenta/registro.js');
const VerificarCuenta = require('../functions/cuenta/verifiacion.js');
const ActualizarCuenta = require('../functions/cuenta/actualizacion.js');
const IngresoCuenta = require('../functions/cuenta/ingreso.js');
const DetalleCuenta = require('../functions/cuenta/detalle.js');
const IniciarTienda = require('../functions/tienda/iniciar.js');
const ActualizarTienda = require('../functions/tienda/actualizar.js');
const EstadoTienda = require('../functions/tienda/estado.js');
const DetalleTienda = require('../functions/tienda/detalle.js');
const ListadoTienda = require('../functions/tienda/listar.js');
const ActualizarCatalogo = require('../functions/tienda/catalogo/actualizar.js');
const RegistrarSolicitud = require('../functions/tienda/solicitud/registrar.js');
const VerificarPropietario = require('../functions/tienda/verificar.js');
const DetalleSolicitud = require('../functions/tienda/solicitud/detalles.js');
const ActualizarSolicitud = require('../functions/tienda/solicitud/actualizar');
const Jwt = require('../functions/sesion/jwt.js');

router.get('/', (req, res, next)=>res.json( { code: 200, message: "Market Me v1", status: true, data: {} }));

router.post('/cuenta/registro', RegistroCuenta.existencia, RegistroCuenta.registro, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/cuenta/verificar', VerificarCuenta.usuario, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/cuenta/actualizar', Jwt.comprobar, ActualizarCuenta.contacto, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/cuenta/actualizar/passwd', Jwt.comprobar, ActualizarCuenta.password, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/cuenta/actualizar/media', Jwt.comprobar, ActualizarCuenta.media, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/cuenta/autentificar', IngresoCuenta.ingreso, Jwt.generar, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: { Cuenta: req.result, Tienda: req.tienda, Estado: req.estado, Media: req.media } }))

router.post('/cuenta/detalle', Jwt.comprobar, DetalleCuenta.cuenta, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: { Cuenta: req.datos, Tienda: req.tienda, Media: req.media } }))

router.post('/tienda/registro', Jwt.comprobar, IniciarTienda.existencia, IniciarTienda.registro, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: { Tienda: { Tid: req.body.tid, Registro: Date.now() }} }));

router.post('/tienda/actualizar', Jwt.comprobar, ActualizarTienda.tienda, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/tienda/deshabilitar', Jwt.comprobar, EstadoTienda.deshabilitar, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/tienda/habilitar', Jwt.comprobar, EstadoTienda.habilitar, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/tienda/detalle', Jwt.comprobar, DetalleTienda.detalle, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: req.datos }));

router.post('/tienda/mistiendas', Jwt.comprobar, DetalleTienda.mistiendas, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: req.datos }));

router.post('/tienda/lista', Jwt.comprobar, ListadoTienda.listar, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: req.datos }));

router.post('/tienda/buscar', Jwt.comprobar, ListadoTienda.buscar, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: req.datos }));

router.post('/tienda/buscar/tag', Jwt.comprobar, ListadoTienda.buscarPorTags, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: req.datos }));

router.post('/tienda/actualizar/catalogo', Jwt.comprobar, ActualizarCatalogo.actualizar, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/solicitud/servicio/registrar', Jwt.comprobar, RegistrarSolicitud.registro, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

router.post('/solicitud/servicio/tienda', Jwt.comprobar, VerificarPropietario.propietario, DetalleSolicitud.tienda, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: req.datos }));

router.post('/solicitud/servicio/detalles', Jwt.comprobar, DetalleSolicitud.solicitud, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: req.datos }));

router.post('/solicitud/servicio/solicitante/actualizar', Jwt.comprobar, ActualizarSolicitud.solicitanteProceso, ActualizarSolicitud.solicitanteComentario, ActualizarSolicitud.solicitanteValoracion, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: req.datos }));

router.post('/solicitud/servicio/propietario/actualizar', Jwt.comprobar, VerificarPropietario.propietario, ActualizarSolicitud.propietarioProceso, ActualizarSolicitud.propietarioComentario, (req, res, next)=>res.send( { code: 200, message: "proceso_completado", status: true, data: {} }));

module.exports = router;