import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { responses, responseTable } from './expanded-thread';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class ExpandedThreadService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    console.log(`ExpandedThreadService: ${message}`);
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

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET all threads from the DB */
  // getThreadResponses(tid: string): Observable<responses[]> {
    
  //   console.log("service tid:" + tid);
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams.append('threadid', tid);    
  //   // console.log("query param: " + queryParams.get('threadid'));
  //   // this.log('fetched responses from DB');
    
  //   return this.http.get<responses[]>(`http://localhost:8080/api/expandedThread/`,{params:queryParams})
  //     .pipe(
  //       tap(_ => this.log(`fetched all responses`)),
  //       catchError(this.handleError<responses[]>('getResponses', [])));
  // }
 
    getThreadResponsesPOST(tid: string): Observable<any> {
    
      // This log will bew useful when adding front-end code
      console.log(`Getting THREAD: ${tid}`)
      let queryParams = new HttpParams();
      queryParams = queryParams.append('threadid', tid);   
  
      return this.http.post<any>(`http://localhost:8080/api/expandedThread/`, {params:queryParams})
      .pipe(
        tap(_ => this.log(`getting thread ${tid}`)), // TODO: determine which id this returns
        catchError(this.handleError<any>('tid')));
  
    }
  
  
  getTrps(): Observable<responseTable[]> {
    
    return this.http.get<responseTable[]>(`http://localhost:8080/api/ThreadResponse/`)
      .pipe(
        tap(_ => this.log(`fetched all rps`)),
        catchError(this.handleError<responseTable[]>('getRps', [])));
  }
}
