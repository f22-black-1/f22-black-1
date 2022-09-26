import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pest } from './pest';
import { PESTS } from './mock-pests';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class PestService {

  constructor(private http: HttpClient) { }

  private pestsUrl = 'api/pests';  // URL to web 
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPest(id: number): Observable<Pest>{

    console.log("Receiving Data from middleware")
   
     return this.http.get<Pest>(`http://localhost:8080/api/pest/`,)
      
    //   this.subscribe(data => {
        
    //   // TODO: Figure out what this does
    //   pestObj.pestId = data.id

    // })
      
  }


  getPests(): Observable<Pest[]> {

    this.log('fetched pests from server');

    /** GET pests from the server */
    return this.http.get<Pest[]>(`http://localhost:8080/api/pests/`)  
    .pipe(
      tap(_ => this.log(`fetched pests`)),
      catchError(this.handleError<Pest[]>('getPests', [])),
      );
  }

  /** Log a PestService message with the MessageService */
  private log(message: string) {
    console.log(`PestService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** PUT: update the pest on the server */
  updatePest(pest: Pest): Observable<any> {
    // // Send the pestObj to the Middleware
    // this.http.post<Pest>(`http://localhost:8080/api/pests/${id}`, {id: `${id}`}).subscribe(data => {
    
    // // TODO: Figure out what this does
    // //id = data.id

    // })
    console.log(`PESTTTTTT: ${pest}`)

    return this.http.post<Pest>('http://localhost:8080/api/pest/create', pest).pipe(
        tap(_ => this.log(`updated pest id=${pest.id}`)),
        catchError(this.handleError<any>('updatePest')));
    // return this.http.put(`http://localhost:8080/api/pest/create`, pest, this.httpOptions).pipe(
    //   tap(_ => this.log(`updated pest id=${pest.id}`)),
    //   catchError(this.handleError<any>('updatePest'))
    // );
  }
}