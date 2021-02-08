import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActividadDetailComponent } from './actividad-detail/actividad-detail.component';
import { ActividadEditComponent } from './actividad-edit/actividad-edit.component';
import { ActividadNewComponent } from './actividad-new/actividad-new.component';

const routes: Routes = [
    {path: '',                    component: HomeComponent},
    {path: 'actividades/:id/new', component: ActividadNewComponent},
    {path: 'actividades/:actividadId', component: ActividadDetailComponent},
    {path: 'actividades/:id/edit', component: ActividadEditComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], 
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
