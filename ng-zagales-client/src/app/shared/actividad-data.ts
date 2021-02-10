import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ActividadData implements InMemoryDbService {

  createDb() {
    let actividades = [
      {
        "id": 0,
        "nombre": "Campamento verano",
        "destino": "Cuacos",
        "fechaPartida": '2015-07-15',
      },
      {
        "id": 1,
        "nombre": "Javierada",
        "destino": "Pamplona",
        "fechaPartida": '2017-03-07',
      },
      {
        "id": 2,
        "nombre": "Parque de atracciones",
        "destino": "Zaragoza",
        "fechaPartida": '2013-06-25',
      },
    ];
    return { actividades: actividades };
  }
}
