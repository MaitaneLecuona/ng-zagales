"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Actividad = /** @class */ (function () {
    function Actividad(id, nombre, destino, fechaPartida) {
        this.id = id;
        this.nombre = nombre;
        this.destino = destino;
        this.fechaPartida = fechaPartida;
    }
    return Actividad;
}());
var actividades = [
    new Actividad(0, "Javierada", "Castillo de Javier", new Date(2021, 4, 14)),
    new Actividad(1, "Campamento de verano", "Cuacos de yuste", new Date(2021, 7, 15)),
];
function getActividades() {
    return actividades;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/actividades', bodyParser.json(), function (req, res) {
    var aNew = new Actividad(actividades.length + 1, req.body.nombre, req.body.destino, req.body.fechaPartida);
    actividades.push(aNew);
    res.status(200).send({
        id: aNew.id,
        nombre: aNew.nombre,
        destino: aNew.destino,
        fechaPartida: aNew.fechaPartida
    });
});
app.get('/', function (req, res) {
    res.send('The URL of actividades is http://localhost:8000/actividades');
});
app.get('/actividades', function (req, res) {
    res.json(getActividades());
});
function getActividadesById(actividadesId) {
    var a;
    a = actividades.find(function (a) { return a.id == actividadesId; });
    return a;
}
app.get('/actividades/:id', function (req, res) {
    res.json(getActividadesById(parseInt(req.params.id)));
});
function updateActividadesById(req, actividadId) {
    var a;
    a = actividades.find(function (a) { return a.id == actividadId; });
    var index = actividades.indexOf(a);
    a.nombre = req.body.nombre,
        a.destino = req.body.destino,
        a.fechaPartida = req.body.fechaPartida;
    actividades[index] = a;
    return a;
}
app.put('/actividades/:id', function (req, res) {
    res.json(updateActividadesById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteActividadesById(actividadId) {
    var a;
    a = actividades.find(function (a) { return a.id == actividadId; });
    var index = actividades.indexOf(a);
    delete actividades[index];
    return a;
}
app.delete('/actividades/:id', function (req, res) {
    res.json(deleteActividadesById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
