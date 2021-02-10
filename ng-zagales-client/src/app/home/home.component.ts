import {Component, OnInit} from '@angular/core';
import {Actividad} from '../shared/actividad';
import {ActividadService} from '../shared/actividad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  actividades: Actividad[]=[];
  constructor(private tripService:ActividadService) { }

  ngOnInit() {
   this.tripService.getActividades().subscribe(
    (data: Actividad[]) => this.actividades = data
   );
  }
}
