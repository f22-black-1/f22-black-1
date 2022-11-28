import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SummaryThread, SummaryThread_Prev, PestTypeFilter } from './summary-thread';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SummaryThreadService {

  constructor(private http: HttpClient) {
   }

  private summaryThreadsUrl = 'api/forum';  // URL to web  
  private selectedThreadID = new BehaviorSubject('thread id value goes here');
  private selectedThreadItem!: SummaryThread_Prev;
  // private selectedThreadItem! = new BehaviorSubject();

  public currentThreadID = this.selectedThreadID.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** Log a SummaryThreadService message with the MessageService */
  private log(message: string) {
    console.log(`SummaryThreadService: ${message}`);
  }

  recoverSelectedThreadInfo(): void {
    this.selectedThreadItem = this.lastSelectedThread();
    console.log("recovery threadid: " + this.selectedThreadItem.threadid);
    this.selectedThreadID = new BehaviorSubject('recovered thread id value goes here');
    this.selectedThreadID.next(this.selectedThreadItem.threadid);
    this.currentThreadID = this.selectedThreadID.asObservable();
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

    saveToLocalStorage(receivedThread: SummaryThread_Prev): void {
      localStorage.setItem('lastSelectedThread', JSON.stringify(receivedThread));
    }
  
    printStoredThreadInfo(): void {
      console.log(localStorage.getItem('lastSelectedThread'));
    }
  
    lastSelectedThread(): SummaryThread_Prev {
      var lsThread = JSON.parse(localStorage.getItem('lastSelectedThread'));
  
      return lsThread;
    }

    /** GET all threads from the DB */
    //formun connects to server.js
    getThreads(): Observable<SummaryThread_Prev[]> {

      this.log('fetched threads from DB');
      
      return this.http.get<SummaryThread_Prev[]>(`http://localhost:8080/api/summaryThreadList/`)
       .pipe(
         tap(_ => this.log(`fetched all threads`)),
         catchError(this.handleError<SummaryThread_Prev[]>('getThreads', [])));
    }

    getThreadsWithFilter(pType: PestTypeFilter): Observable<SummaryThread_Prev[]> {

      this.log('fetched threads from DB');
      console.log('pest type: ' + pType);

      return this.http.post<SummaryThread_Prev[]>('http://localhost:8080/api/summaryThreadList/pestType', pType)
       .pipe(
         tap(_ => this.log(`fetched all thread with pest type: ${pType.pesttype}`)),
         catchError(this.handleError<SummaryThread_Prev[]>('getThreads', [])));
    }

    updateSelectedThread(tid: string) {
      this.selectedThreadID.next(tid);
    }

    updateSelectedThreadItem(stItem: SummaryThread_Prev): void {
      this.selectedThreadItem = stItem;
      this.saveToLocalStorage(this.selectedThreadItem);
    }

    getSelectedThreadItem(): SummaryThread_Prev {
      if(this.selectedThreadItem === undefined || this.selectedThreadItem === null )
      {
        console.log('value not found. Retrieving last selected thread data');
        this.recoverSelectedThreadInfo();
      }
      
      console.log('selected item id:' + this.selectedThreadItem.threadid)

      return this.selectedThreadItem;
    }

}
