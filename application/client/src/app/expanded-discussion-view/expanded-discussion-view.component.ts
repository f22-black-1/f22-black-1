import { Component, OnInit } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SummaryThread_Prev } from '../summary-thread';
import { SummaryThreadService } from "../summary-thread.service";
import { responses, responseTable, newResponse } from "../expanded-thread";
import { ExpandedThreadService } from "../expanded-thread.service";

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

  //Temp - User Profile Data
  public userID: string = "12d09e49-2368-44d8-b21c-1b8e10c7cb2e";

  constructor(private sumThreadService:SummaryThreadService, private expThreadService: ExpandedThreadService) { }

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
    this.showTextInput = false;
  }

  sendNewResponse(newResponse: string): void {
    let responseInfo: newResponse = {
      threadid: this.receivedThreadID,
      userid: this.userID,
      responsedate: new Date(),
      comment: newResponse
    }

    console.log("Sending: " + responseInfo.threadid + ", " + responseInfo.userid + ", " + responseInfo.responsedate + ", " + responseInfo.comment);

    this.expThreadService.addResponse(responseInfo).subscribe(async data => {});
  }

  displaySubmittedInfo(comment: string): void {
    console.log("Submitted Info");
    console.log("Comment: " + comment);
  }

  printResponse(): void {
    console.log(this.responseList[1].comment);
    // console.log(this.rptl[0].comment);
  }

}
