import {Component, OnInit} from '@angular/core';
import {ActividadService} from '..//shared/actividad.service';
import {Actividad} from '..//shared/actividad';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-actividad-detail',
  templateUrl: './actividad-detail.component.html',
  styleUrls: ['./actividad-detail.component.css']
})
export class ActividadDetailComponent implements OnInit {

  actividad: Actividad;
  actividadId: number;

  constructor(private activatedroute: ActivatedRoute, private router: Router, private actividadService: ActividadService) {}

  ngOnInit() {
    this.actividadId = parseInt(this.activatedroute.snapshot.params['actividadId']);
    this.actividadService.getActividadById(this.actividadId).subscribe(
      (data: Actividad) => this.actividad = data
    );
  }
  goEdit():void{
    this.router.navigate(['/actividades', this.actividadId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }

}
