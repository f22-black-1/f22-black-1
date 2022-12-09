import { Component, OnInit, ViewChild } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SummaryThread_Prev } from '../summary-thread';
import { SummaryThreadService } from "../summary-thread.service";
import { responses, responseTable, newResponse, feedback } from "../expanded-thread";
import { ExpandedThreadService } from "../expanded-thread.service";
import { PestInfoComponent } from '../pest-info/pest-info.component';
import { CurrentUser } from '../login'
import { UserinfocardComponent } from '../userinfocard/userinfocard.component';
import { UserInfo, CurrentUser_t } from '../userinfo';

@Component({
  selector: 'app-expanded-discussion-view',
  templateUrl: './expanded-discussion-view.component.html',
  styleUrls: ['./expanded-discussion-view.component.css']
})
export class ExpandedDiscussionViewComponent implements OnInit {

  public responseList: responses[] = [];
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

  public modalThread: string;
  public mtData: CurrentUser_t;
  
  constructor(private sumThreadService:SummaryThreadService, private expThreadService: ExpandedThreadService,
<<<<<<< HEAD
    private router: Router, public infoCard: MatDialog) { 
=======
    private  dialogRef: MatDialog, private router: Router, public infoCard: MatDialog) { 
>>>>>>> 6c14382dc02a88c0193bf029595562e668a5be7f
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

  openUserInfoCard(uID: string, uName: string): void {
    let selectedUser: CurrentUser = {
      userid: uID,
      username: uName,
    }
    const userInfo = this.infoCard.open(UserinfocardComponent, {
      data: {userid: selectedUser.userid, username: selectedUser.username, 
        modalThread: this.modalThread}
    });

    userInfo.afterClosed().subscribe(result => this.mtData = result);

    console.log("Selected comp thread: " + this.mtData.threadid);
  }

  generateUser(): CurrentUser {
    let tempUser: CurrentUser = {
      userid: "12d09e49-2368-44d8-b21c-1b8e10c7cb2e",
      username: "KDecker",
    }
    return tempUser;
  }

  
  addNumbers(firstNumber: number, secondNumber: number): number {
    // console.log("first number: " + firstNumber);
    // console.log("second number: " + secondNumber);

    var numSum = Number(Number(firstNumber) + Number(secondNumber));

    // console.log("number sum: " + numSum);

    return numSum;
  }

  getResponses(): Array<responses> {
    console.log("getting responses for: " + this.getReceivedThreadItem().threadid);

    this.expThreadService.getThreadResponsesPOST(this.receivedThreadID, this.signedInUser.userid)
    .subscribe(etr => this.responseList = etr);

    return this.responseList
  }

  getResponsesList(): Array<responses> {
    return this.responseList;
  }
  
  getRps(): Array<responseTable> {

    this.expThreadService.getThreadResponsesPOST(this.receivedThreadID, this.signedInUser.userid)
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

  upVote(currentRating: number, responseID: string): void {
    console.log("up voting...");
    console.log("number received: " + currentRating);
    console.log("rep id: " + responseID);

    let feedbackRecord: feedback = {
      responseid: responseID,
      threadid: this.receivedThreadItem.threadid,
      submitterid: this.signedInUser.userid,
      userid: this.signedInUser.userid,
      positive: true,
      inappropriate: false,
      submitdate: new Date(),
    }

    var updateExisting = false;

    if(currentRating != 2)
    {
      if(currentRating == 1)
        updateExisting =true;

        console.log("updating/adding record");
        this.expThreadService.updateFeedback(feedbackRecord, updateExisting).subscribe(
          (data)=>{
            console.log(data);
            this.ngOnInit();
            }),
            (_err: any)=>{
              console.log("Error");
            }
    }
    else
    {
      console.log("deleting existing record");
      this.expThreadService.deleteFeedback(feedbackRecord).subscribe(
        (data)=>{
          console.log(data);
          this.ngOnInit();
          }),
          (_err: any)=>{
            console.log("Error");
          }
    }
  }

  downVote(currentRating: number, responseID: string): void {
    console.log("down voting...");
    console.log("number received: " + currentRating);
    console.log("rep id: " + responseID);

    let feedbackRecord: feedback = {
      responseid: responseID,
      threadid: this.receivedThreadItem.threadid,
      submitterid: this.signedInUser.userid,
      userid: this.signedInUser.userid,
      positive: false,
      inappropriate: false,
      submitdate: new Date(),
    }

    var updateExisting = false;

    if(currentRating != 1) //Response either has no feedback or positive feedback
    {
      if(currentRating == 2) //Positive feedback record exists so function will look for existing record to update 
        updateExisting = true;                //instead of creating a new one   

        console.log("updating/adding record");
        this.expThreadService.updateFeedback(feedbackRecord, updateExisting).subscribe(
          (data)=>{
            console.log(data);
            this.ngOnInit();
            }),
            (_err: any)=>{
              console.log("Error");
            }
    }
    else
    {
      console.log("deleting existing record");
      this.expThreadService.deleteFeedback(feedbackRecord).subscribe(
        (data)=>{
          console.log(data);
          this.ngOnInit();
          }),
          (_err: any)=>{
            console.log("Error");
          }
    }
  }


  displaySubmittedInfo(comment: string): void {
    console.log("Submitted Info");
    console.log("Comment: " + comment);
  }
  
  printResponse(): void {
    console.log("click even triggered");
<<<<<<< HEAD
=======
  }

  openPestInfoWindow(): void {
    this.dialogRef.open(PestInfoComponent, {
      data: {incidentID: this.receivedThreadItem.incidentid}
    });
>>>>>>> 6c14382dc02a88c0193bf029595562e668a5be7f
  }

}
