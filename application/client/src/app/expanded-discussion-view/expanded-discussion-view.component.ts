import { Component, OnInit } from '@angular/core';
import { SummaryThread_Prev } from '../summary-thread';
import { SummaryThreadService } from "../summary-thread.service";
import { responses, responseTable } from "../expanded-thread";
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
  
  constructor(private sumThreadService:SummaryThreadService, private expThreadService: ExpandedThreadService) { }

  ngOnInit(): void {
    this.sumThreadService.currentThreadID.subscribe(idNum => this.receivedThreadID = idNum)
    this.receivedThreadItem = this.sumThreadService.getSelectedThreadItem();
    // console.log("getting responses for: " + this.getReceivedThreadItem().threadid);
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

  printResponse(): void {
    console.log(this.responseList[1].comment);
    // console.log(this.rptl[0].comment);
  }

}
