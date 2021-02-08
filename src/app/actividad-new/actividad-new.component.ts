import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actividad } from '../shared/actividad';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../shared/actividad.service';

@Component({
  selector: 'app-actividad-new',
  templateUrl: './actividad-new.component.html',
  styleUrls: ['./actividad-new.component.css']
})
export class ActividadNewComponent implements OnInit {

  pageTitle = 'Nueva actividad';
  errorMessage: string;
  actividadForm: FormGroup;

  actividadId:number;
  actividad: Actividad;

  constructor(private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private actividadService: ActividadService) {  }

  ngOnInit(): void {
    this.actividadForm = this.fb.group({
      nombre: '',
      destino: '',
      fechaPartida: '',
    });

    // Read the actividad Id from the route parameter
    this.actividadId = parseInt(this.activatedroute.snapshot.params['actividadId']);
  }

  saveActividad(): void {
    if (this.actividadForm.valid) {
      if (this.actividadForm.dirty) {
        this.actividad = this.actividadForm.value;
        this.actividad.id = this.actividadId;
        
        this.actividadService.createActividad(this.actividad)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.actividadForm.reset();
    this.router.navigate(['']);
  }
  
}
