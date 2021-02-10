import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Actividad } from '../shared/actividad';
import { ActividadService } from '../shared/actividad.service';

@Component({
  templateUrl: './actividad-edit.component.html'
})

export class ActividadEditComponent implements OnInit{

  pageTitle = 'Editar actividad';
  errorMessage: string;
  actividadForm: FormGroup;

  ver:boolean=false;
  tmpFechaPartida: string;

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
    this.actividadId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getActividad(this.actividadId);
  }

  getActividad(id: number): void {
    this.actividadService.getActividadById(id)
      .subscribe(
        (actividad: Actividad) => {
          this.displayActividad(actividad)
          this.ver = true;
        },
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayActividad(actividad: Actividad): void {
    if (this.actividadForm) {
      this.actividadForm.reset();
    }
    this.actividad = actividad;
    this.pageTitle = `Editar actividad: ${this.actividad.destino}`;

    this.tmpFechaPartida = this.actividad.fechaPartida.toString();


    // Update the data on the form
    this.actividadForm.patchValue({
      nombre: this.actividad.nombre,
      destino: this.actividad.destino,
      fechapartida: this.actividad.fechaPartida,
    });
  }

  deleteactividad(): void {
    if (this.actividad.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`¿De verdad quieres eliminar la actividad: ${this.actividad.destino}?`)) {
        this.actividadService.deleteActividad(this.actividad.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }


  saveactividad(): void {
    if (this.actividadForm.valid) {
      if (this.actividadForm.dirty) {
        this.actividad = this.actividadForm.value;
        this.actividad.id = this.actividadId;
        
        this.actividadService.updateActividad(this.actividad)
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
