import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pest } from './pest';
import { PESTS } from './mock-pests';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PestService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private pestsUrl = 'api/pests';  // URL to web 
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPests(): Observable<Pest[]> {
    const pests = of(PESTS);
    this.messageService.add('PestService: fetched pests');

    // return pests;

    /** GET pests from the server */
    return this.http.get<Pest[]>(this.pestsUrl)
    .pipe(
      tap(_ => this.log('fetched pests')),
      catchError(this.handleError<Pest[]>('getPests', []))
    );
  }

  getPest(id: number): Observable<Pest> {
    // For now, assume that a pest with the specified `id` always exists.
    // Error handling needs to be added.
    // const pest = PESTS.find(h => h.id === id)!;
    // this.messageService.add(`PestService: fetched pest id=${id}`);
    // return of(pest);

    const url = `${this.pestsUrl}/${id}`;
    return this.http.get<Pest>(url).pipe(
      tap(_ => this.log(`fetched pest id=${id}`)),
      catchError(this.handleError<Pest>(`getPest id=${id}`))
    );
  }

  /** Log a PestService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PestService: ${message}`);
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
    return this.http.put(this.pestsUrl, pest, this.httpOptions).pipe(
      tap(_ => this.log(`updated pest id=${pest.id}`)),
      catchError(this.handleError<any>('updatePest'))
    );
  }
}