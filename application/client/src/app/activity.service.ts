import { Injectable } from '@angular/core';
import { Activity } from './activity';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  private activityUrl = 'api/activity';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  /** Log a ActivityService message with the MessageService */
  private log(message: string) {
    console.log(`ActivityService: ${message}`);
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

 /** GET ALL activities from the DB */
 getActivities(): Observable<Activity[]> {

  this.log('fetched activities from DB');

  return this.http.get<Activity[]>(`http://localhost:8080/api/activity/`)  
  .pipe(
    tap(_ => this.log(`fetched all activities`)),
    catchError(this.handleError<Activity[]>('getActivities', [])));
  }
  
  //TODO: This is here so things don't break but otherwise plays no current role
  getActivity(id: number): Observable<Activity>{
    console.log("Receiving Data from middleware")  
    return this.http.get<Activity>(`http://localhost:8080/api/activity/`,)  
  }

  //TODO: finish CRUD operations
  //Create a new activity and post to the DB
  createActivity(activity: Activity): Observable<any> {
    
    // This log will be useful when adding front-end code
    console.log(`Creating ACTIVITY: ${activity.activitytype}`)

    return this.http.post<Activity>(`http://localhost:8080/api/activity/create`, activity)
    .pipe(
      tap(_ => this.log(`created new ${activity.activitytype}`)), // TODO: determine which id this returns
      catchError(this.handleError<Activity>('createPest')));

  }
}
