import {Component, Input} from '@angular/core';
import {Actividad} from '../shared/actividad';

@Component({
  selector: 'app-actividad-item',
  templateUrl: './actividad-item.component.html',
  styleUrls: ['./actividad-item.component.css']
})
export class ActividadItemComponent {

  @Input() actividad: Actividad;
}
