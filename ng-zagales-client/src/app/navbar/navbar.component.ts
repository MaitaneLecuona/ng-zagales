import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../shared/actividad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id : any;

  constructor(private actividadService: ActividadService, private router: Router) { }

  ngOnInit() {
  }

  newActividad(){
      // Get max product Id from the product list
      this.actividadService.getMaxActividadId().subscribe( data =>{
        this.id = data;
        this.router.navigate(['/actividades', this.id, 'new']);
      });
      
  }



}
