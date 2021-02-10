import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Actividad } from './actividad';

@Injectable({
  providedIn: 'root'
})

export class ActividadService {
  private actividadUrl = 'http://localhost:8000/actividades';

  constructor(private http: HttpClient) { }

  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.actividadUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMaxActividadId(): Observable<Actividad> {
    return this.http.get<Actividad[]>(this.actividadUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getActividadById(id: number): Observable<Actividad> {
    const url = `${this.actividadUrl}/${id}`;
    return this.http.get<Actividad>(url)
      .pipe(
        tap(data => console.log('getActividad: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createActividad(actividad: Actividad): Observable<Actividad> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    actividad.id = null;
    return this.http.post<Actividad>(this.actividadUrl, actividad, { headers: headers })
      .pipe(
        tap(data => console.log('createActividad: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteActividad(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.actividadUrl}/${id}`;
    return this.http.delete<Actividad>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteActividad: ' + id)),
        catchError(this.handleError)
      );
  }

  updateActividad(actividad: Actividad): Observable<Actividad> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.actividadUrl}/${actividad.id}`;
    return this.http.put<Actividad>(url, actividad, { headers: headers })
      .pipe(
        tap(() => console.log('updateActividad: ' + actividad.id)),
        // Return the Actividad on an update
        map(() => actividad),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
