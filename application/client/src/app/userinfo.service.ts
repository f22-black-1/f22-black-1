import { Injectable } from '@angular/core';
import { CurrentUser } from './login';
import { UserInfo, UserInfoThread, UserAccountInfo } from './userinfo';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {


  constructor(private http: HttpClient) {
      // if(this.activeUser() == null || this.activeUser() == undefined)
      // {
      //   console.log("No users signed-in.  Setting current user to readonly");
      //   this.signedInUser = this.notSignedIn();
      // }
      // else
      // {
      //   console.log("Existing user session found.  Restoring user...");
      //   this.signedInUser = this.activeUser();
      // }
      
   }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** Log a SummaryThreadService message with the MessageService */
  private log(message: string) {
    console.log(`UserInfo: ${message}`);
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

  notSignedIn(): CurrentUser {
    let temp: CurrentUser = {
      userid: "00000000-0000-0000-0000-000000000000",
      username: "Not_Signed_In",
    }

    return temp;
  }

  saveToLocalStorage(currentSessionUser: CurrentUser): void {
    localStorage.setItem('activeUser', JSON.stringify(currentSessionUser));
  }

  activeUser(): CurrentUser {
    let user: CurrentUser = JSON.parse(localStorage.getItem('activeUser'));

    if(user == null || user == undefined)
      return this.notSignedIn();
    else
      return user;
  }

  /** PUT (update) a current user in the DB*/
  updateCurrentUser(cUser: string): Observable<any> {

    console.log(`Updating Current User: ${cUser}`)

    return this.http.post<string>('http://localhost:8080/api/CurrentUser/update', cUser).pipe(
        tap(_ => this.log(`updated CurrentUser`)),
        catchError(this.handleError<string>('updating CurrentUser')));
  }

  getRegisteredUsers(): Observable<UserAccountInfo[]> {
  
    return this.http.get<UserAccountInfo[]>('http://localhost:8080/api/users')
    .pipe(
      tap(_ => this.log(`getting list of registered users`)),
      catchError(this.handleError<UserAccountInfo[]>('getting user data')));
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
