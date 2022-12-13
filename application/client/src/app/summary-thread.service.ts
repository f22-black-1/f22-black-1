import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Router, Route } from '@angular/router';

import { SummaryThread, SummaryThread_Prev, PestTypeFilter, 
  IncidentData, PestRepID, NewThreadData, ThreadID, NewOriginalResponse } from './summary-thread';

import { ExpandedThreadService } from './expanded-thread.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SummaryThreadService {

  constructor(private http: HttpClient, private router: Router, 
    private expThreadService: ExpandedThreadService) {
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

    getThreadByID(tid: string): Observable<SummaryThread_Prev> {
      let tidInt: ThreadID = {
        threadid: tid,
      }
      console.log('fetched thread: ' + tid);

      return this.http.post<SummaryThread_Prev>('http://localhost:8080/api/summaryThreadList/threadid', tidInt)
       .pipe(
         tap(_ => this.log(`fetched thread id: ${tidInt.threadid}`)),
         catchError(this.handleError<SummaryThread_Prev>('getThread')));
    }

    updateSelectedThread(tid: string) {
      this.selectedThreadID.next(tid);
    }

    updateSelectedThreadItem(stItem: SummaryThread_Prev): void {
      this.selectedThreadItem = stItem;
      this.saveToLocalStorage(this.selectedThreadItem);
    }

    expandThread(threadid: string, inExpComp: boolean = false): void {
      this.getThreadByID(threadid).subscribe(data => this.selectedThreadItem = data);
      this.expThreadService.selectedThread = this.selectedThreadItem;

      if(inExpComp == true)
      {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./expanded-discussion-view']);
      }
      else(inExpComp == false)
      {
        this.router.navigate(['../expanded-discussion-view']);
      }

      //Update selected thread with new thread
      this.updateSelectedThread(threadid);
      this.updateSelectedThreadItem(this.selectedThreadItem);
    }

    getSelectedThreadItem(): SummaryThread_Prev {
      // console.log("thread id before eval: " + this.selectedThreadItem.threadid);
      if(this.selectedThreadItem === undefined || this.selectedThreadItem === null )
      {
        console.log('value not found. Retrieving last selected thread data');
        this.recoverSelectedThreadInfo();
      }
      
      console.log('selected item id:' + this.selectedThreadItem.threadid);

      return this.selectedThreadItem;
    }

    addNewIncident(incItem: IncidentData): Observable<IncidentData> {
      console.log("submitter id: " + incItem.submitterid);
  
      return this.http.post<IncidentData>('http://localhost:8080/api/incident/createNewIncident', incItem)
      .pipe(
        tap(_ => this.log(`adding incident for user: ${incItem.submitterid}`)),
        catchError(this.handleError<IncidentData>('create response')));
    }

    updatePestReportID(pRepID: PestRepID): Observable<PestRepID> {
      console.log("report id: " + pRepID.reportid);
  
      return this.http.post<PestRepID>('http://localhost:8080/api/pestreport/updateIncidentID', pRepID)
      .pipe(
        tap(_ => this.log(`adding incident for user: ${pRepID.reportid}`)),
        catchError(this.handleError<PestRepID>('create response')));
    }


    addNewThread(newThreadData: NewThreadData): Observable<ThreadID> {
      console.log("incident(report) id: " + newThreadData.incidentid);
      console.log("subject(title): " + newThreadData.subject);
      console.log("comment: " + newThreadData.comment);
      
      return this.http.post<ThreadID>('http://localhost:8080/api/thread/addNewThread', newThreadData)
      .pipe(
        tap(_ => this.log(`adding thread for incident id: ${newThreadData.incidentid}`)),
        catchError(this.handleError<ThreadID>('create thread')));
    }

    addNewActivity(newThreadData: NewThreadData): Observable<ThreadID> {
      console.log("incident(report) id: " + newThreadData.incidentid);
      console.log("subject(title): " + newThreadData.subject);
      console.log("comment: " + newThreadData.comment);
      
      return this.http.post<ThreadID>('http://localhost:8080/api/thread/addCreationThread', newThreadData)
      .pipe(
        tap(_ => this.log(`adding thread for incident id: ${newThreadData.incidentid}`)),
        catchError(this.handleError<ThreadID>('create thread')));
    }
    
    getThreadID(pRepID: PestRepID): Observable<PestRepID> {
      console.log("report id: " + pRepID.reportid);
  
      return this.http.post<PestRepID>('http://localhost:8080/api/thread/addCreationThread', pRepID)
      .pipe(
        tap(_ => this.log(`getting thread for report id: ${pRepID.reportid}`)),
        catchError(this.handleError<PestRepID>('get thread id')));
    }

    addFirstResponse(newResponse: NewOriginalResponse): Observable<NewOriginalResponse> {
      console.log("response id: " + newResponse.responseid);
      console.log("user id: " + newResponse.userid);
      console.log("response date: " + newResponse.responsedate);
      console.log("comment: " + newResponse.comment);
      
      return this.http.post<NewOriginalResponse>('http://localhost:8080/api/threadresponse/addOriginalThread', newResponse)
      .pipe(
        tap(_ => this.log(`adding thread for response id: ${newResponse.responseid}`)),
        catchError(this.handleError<NewOriginalResponse>('create response')));
    }
}
