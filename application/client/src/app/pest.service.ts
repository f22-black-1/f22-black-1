import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pest, Incident, PestReport, PestType, PestMin } from './pest';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class PestService {

  constructor(private http: HttpClient) { }

  private pestsUrl = 'api/pests';  // URL to web 
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  /** GET ALL pests from the DB */
  getPests(): Observable<Pest[]> {

    this.log('fetched pests from DB');


    return this.http.get<Pest[]>(`http://localhost:8080/api/pests/`)  
    .pipe(
      tap(_ => this.log(`fetched all pests`)),
      catchError(this.handleError<Pest[]>('getPests', [])));
  }

    //get a single pest by id
  getAPest(pest: Pest): Observable<any>{

    console.log(`fetched pest from DB`);
    console.log(`${pest}`);
    
    return this.http.post<Pest>('http://localhost:8080/api/pest/apest', pest)
    .pipe(
      tap(_=> this.log(`fetched a pest`)),
      catchError(this.handleError<Pest>(`getAPest`)));
  }

  // Get a single pest by incident ID
  getAPestByIncidentID(incidentID: string): Observable<Pest> {
    
    let queryParams = new HttpParams();
    queryParams = queryParams.append('incidentid', incidentID);   
    console.log(`fetched pest from DB`);

    return this.http.post<Pest>('http://localhost:8080/api/pest/incidentpest', {params:queryParams})
    .pipe(
      tap(_=> this.log(`fetched a pest`)),
      catchError(this.handleError<Pest>(`getAPestReportByIncidentID`)));
  }

  /** PUT (update) a pest in the DB with a given id */
  updatePest(pest: Pest): Observable<any> {

    console.log(`Updating PEST: ${pest}`)

    return this.http.post<Pest>('http://localhost:8080/api/pest/update', pest).pipe(
        tap(_ => this.log(`updated pest id=${pest.pestid}`)),
        catchError(this.handleError<Pest>('updatePest')));
  }
    /** GET DISTINCT pest types from the DB */
    getPestTypes(): Observable<PestType[]> {

      this.log('fetched pests from DB');
  
  
      return this.http.get<PestType[]>(`http://localhost:8080/api/pests/types`)  
      .pipe(
        tap(_ => this.log(`fetched all pest types`)),
        catchError(this.handleError<PestType[]>('getPestTypes', [])));
    }

  /** GET ALL incidents from the DB */
  getIncidents(): Observable<any> {

    this.log('fetched incidents from DB');


    return this.http.get<Incident[]>(`http://localhost:8080/api/incidents/`)  
    .pipe(
      tap(_ => this.log(`fetched all incidents`)),
      catchError(this.handleError<Incident[]>('getIncidents', []))
    );
  }
  
    /** GET ALL Pest Reports from the DB */
    getPestReports(): Observable<any> {

      this.log('fetched incidents from DB');
  
  
    return this.http.get<PestReport[]>(`http://localhost:8080/api/pestreports/`)  
      .pipe(
        tap(_ => this.log(`fetched all pestreports`)),
        catchError(this.handleError<PestReport[]>('getPestReports', []))
      );
    }


  /** POST NEW pest to the DB */
  createPest(pest: PestMin): Observable<any> {
    
    // This log will bew useful when adding front-end code
    console.log(`Creating PEST: ${pest.pesttype}`)

    return this.http.post<PestMin>(`http://localhost:8080/api/pest/create`, pest)
    .pipe(
      tap(_ => this.log(`created new ${pest.pesttype}`)), // TODO: determine which id this returns
      catchError(this.handleError<PestMin>('createPest')));

  }


  /** DELETE an entire pest object in the DB */
  deletePest(pest: Pest): Observable<any> {
    console.log(`Deleting PEST: ${pest}`)

    return this.http.delete<Pest>('http://localhost:8080/api/pest/delete')
    .pipe(
      tap(_ => this.log(`Deleted PEST`)),
      catchError(this.handleError<Pest>('deltePest')),
      );
  }

  


  //TODO: This is here so things don't break but otherwise plays no current role
  getPest(id: number): Observable<Pest>{
    console.log("Receiving Data from middleware")  
    return this.http.get<Pest>(`http://localhost:8080/api/pest/`,)  
  }
}