import { Injectable } from '@angular/core';
import { CurrentUser } from './login';
import { UserInfo, UserInfoThread } from './userinfo';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** Log a SummaryThreadService message with the MessageService */
  private log(message: string) {
    console.log(`SummaryThreadService: ${message}`);
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


  getUserInfo(selectedUser: CurrentUser): Observable<UserInfo> {
    
    return this.http.post<UserInfo>('http://localhost:8080/api/userInfoRating', selectedUser)
    .pipe(
      tap(_ => this.log(`getting info for user: ${selectedUser.username}`)),
      catchError(this.handleError<UserInfo>('getting user data')));
  }

  getUserMessageActivity(selectedUser: CurrentUser): Observable<UserInfoThread[]> {
    
    return this.http.post<UserInfoThread[]>('http://localhost:8080/api/userThreadMetrics', selectedUser)
    .pipe(
      tap(_ => this.log(`getting info for user: ${selectedUser.username}`)),
      catchError(this.handleError<UserInfoThread[]>('getting user data')));
  }

}
