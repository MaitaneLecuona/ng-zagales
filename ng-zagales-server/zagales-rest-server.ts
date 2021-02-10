var express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Actividad {
    constructor(
        public id: number,
        public nombre: string,
        public destino: string,
        public fechaPartida: Date
    ){}
}

const actividades: Actividad[] = [
    new Actividad(
        0,
        "Javierada",
        "Castillo de Javier",
        new Date(2021,4,14)
    ),
    new Actividad(
        1,
        "Campamento de verano",
        "Cuacos de yuste",
        new Date(2021,7,15)
    ),
]


function getActividades(): any[]{
    return actividades;
}

app.use(function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json())

app.post('/actividades', bodyParser.json(), (req: any, res: any,) => {
    
    let aNew = new Actividad(
        actividades.length + 1,
        req.body.nombre,
        req.body.destino,
        req.body.fechaPartida
    );
    actividades.push(aNew);
    res.status(200).send({
        id: aNew.id,
        nombre: aNew.nombre,
        destino: aNew.destino,
        fechaPartida: aNew.fechaPartida
    });
})

app.get('/', (req: any, res: any) => {
    res.send('The URL of actividades is http://localhost:8000/actividades');
});

app.get('/actividades', (req: any, res: any) => {
    res.json(getActividades());
});

function getActividadesById(actividadesId: number): any {
    let a: any;
    a = actividades.find(a => a.id == actividadesId);
    return a;
}

app.get('/actividades/:id', (req: any, res: any) => {
    res.json(getActividadesById(parseInt(req.params.id)));
});

function updateActividadesById(req: any, actividadId: number): any {
    let a: any;
    a = actividades.find(a => a.id == actividadId);
    let index = actividades.indexOf(a);

    a.nombre = req.body.nombre,
    a.destino = req.body.destino,
    a.fechaPartida = req.body.fechaPartida

    actividades[index] = a;
    return a;
}

app.put('/actividades/:id', function (req: any, res: any){
    res.json(updateActividadesById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});

function deleteActividadesById(actividadId: number): any{
    let a: any;
    a = actividades.find(a => a.id == actividadId);
    let index = actividades.indexOf(a);
    delete actividades[index];
    return a;
}

app.delete('/actividades/:id', function (req: any, res: any){
    res.json(deleteActividadesById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});

const server = app.listen(8000, "localhost", () => {
    const {address, port} = server.address();

    console.log('Listening on %s %s', address, port);
});