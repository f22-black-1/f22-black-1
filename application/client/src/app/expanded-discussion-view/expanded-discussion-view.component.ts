import { Component, OnInit, ViewChild } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatMenuModule } from '@angular/material/menu';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SummaryThread_Prev } from '../summary-thread';
import { SummaryThreadService } from "../summary-thread.service";
import { responses, responseTable, newResponse } from "../expanded-thread";
import { ExpandedThreadService } from "../expanded-thread.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PestInfoComponent } from '../pest-info/pest-info.component';
import { CurrentUser } from '../login'

@Component({
  selector: 'app-expanded-discussion-view',
  templateUrl: './expanded-discussion-view.component.html',
  styleUrls: ['./expanded-discussion-view.component.css']
})
export class ExpandedDiscussionViewComponent implements OnInit {

  private responseList: responses[] = [];
  private response!: responses;

  private rptl: responseTable[] = [];
  private rp!: responseTable;

  public receivedThreadID: string="";
  private receivedThreadItem!: SummaryThread_Prev;

  private unsavedResponse: boolean = false;
  public showTextInput: boolean = false;
  public textInput = new FormControl('');
  public userInput: string;
  
  public userResponse!: newResponse;
  public signedInUser: CurrentUser;
  public menu1: MatMenuModule; //not sure if necessary yet

  constructor(private sumThreadService:SummaryThreadService, private expThreadService: ExpandedThreadService,
    private  dialogRef: MatDialog, private router: Router) { 
    this.signedInUser = this.generateUser();
  }

  ngOnInit(): void {
    this.receivedThreadItem = this.sumThreadService.getSelectedThreadItem();
    this.sumThreadService.currentThreadID.subscribe(idNum => this.receivedThreadID = idNum)

    this.getRps();
    this.getResponses();
  }

  public getReceivedThreadItem(): SummaryThread_Prev {
    // console.log(this.receivedThreadItem);
    return this.receivedThreadItem;
  }

  generateUser(): CurrentUser {
    let tempUser: CurrentUser = {
      userid: "12d09e49-2368-44d8-b21c-1b8e10c7cb2e",
      username: "KDecker",
    }
    return tempUser;
  }

  getResponses(): Array<responses> {
    console.log("getting responses for: " + this.getReceivedThreadItem().threadid);

    this.expThreadService.getThreadResponsesPOST(this.receivedThreadID)
    .subscribe(etr => this.responseList = etr);

    return this.responseList
  }

  getResponsesList(): Array<responses> {
    return this.responseList;
  }
  
  getRps(): Array<responseTable> {

    this.expThreadService.getThreadResponsesPOST(this.receivedThreadID)
    .subscribe(etr => this.responseList = etr);

    return this.rptl;
  }

  generateResponseInputWindow(): void {
    this.showTextInput = true;
  }

  saveResponse(): void {
    this.showTextInput = false;
  }

  discardResponse(): void {
    this.textInput.reset();
    this.showTextInput = false;
  }

  sendNewResponse(newResponse: string): void {
    let responseInfo: newResponse = {
      threadid: this.receivedThreadID,
      userid: this.signedInUser.userid,
      responsedate: new Date(),
      comment: newResponse
    }

    console.log("Sending: " + responseInfo.threadid + ", " + responseInfo.userid + ", " + responseInfo.responsedate + ", " + responseInfo.comment);

    // this.expThreadService.addResponse(responseInfo).subscribe(async data => {});
    // this.textInput.reset();
    // this.ngOnInit();

    this.expThreadService.addResponse(responseInfo).subscribe((data)=>{
      console.log(data);
      this.textInput.reset();
      this.ngOnInit();
      this.showTextInput = false;
      }),
      (_err: any)=>{
        console.log("Error");
      }
  }

  removeResponse(repID: string): void {
    let repInfo: responseTable = {
      responseid: repID,
      threadid: '',
      userid: '',
      responsedate: new Date(),
      comment: 'delete request',
    }

    console.log("Deleting response: " + repInfo.responseid);

    // this.expThreadService.deleteResponse(repInfo).subscribe(async data => {});

    this.expThreadService.deleteResponse(repInfo).subscribe(
    (data)=>{
      console.log(data);
      this.ngOnInit();
      }),
      (_err: any)=>{
        console.log("Error");
      }
  }

  removeThread(repID: string): void {
    let repInfo: responseTable = {
      responseid: repID,
      threadid: 'REMOVE_ALL',
      userid: '',
      responsedate: new Date(),
      comment: 'Original_Thread',
    }

    console.log("Deleting response: " + repInfo.responseid);

    // this.expThreadService.deleteResponse(repInfo).subscribe(async data => {});
    this.expThreadService.deleteResponse(repInfo).subscribe(async data => {});

    this.expThreadService.deleteThread(repInfo).subscribe(
      async data => {
      console.log(data);
      }),
      (_err: any)=>{
        console.log("Error");
      };
    this.router.navigate(['../forum'])
  }

  displaySubmittedInfo(comment: string): void {
    console.log("Submitted Info");
    console.log("Comment: " + comment);
  }

  printResponse(): void {
    console.log("attempting to route");
    this.router.navigate(['../forum']);
  }

  openPestInfoWindow(): void {
    this.dialogRef.open(PestInfoComponent, {
      data: {incidentID: this.receivedThreadItem.incidentid}
    });
  }

}
