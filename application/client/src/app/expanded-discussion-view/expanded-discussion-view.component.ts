import { Component, OnInit } from '@angular/core';
import { SummaryThread_Prev } from '../summary-thread';
import { SummaryThreadService } from "../summary-thread.service";
import { responses } from "../expanded-thread";
import { ExpandedThreadService } from "../expanded-thread.service";

@Component({
  selector: 'app-expanded-discussion-view',
  templateUrl: './expanded-discussion-view.component.html',
  styleUrls: ['./expanded-discussion-view.component.css']
})
export class ExpandedDiscussionViewComponent implements OnInit {
  private responseList: responses[] = [];
  private response!: responses;

  public receivedThreadID: string="";
  private receivedThreadItem!: SummaryThread_Prev;
  
  constructor(private sumThreadService:SummaryThreadService, private expThreadService: ExpandedThreadService) { }

  ngOnInit(): void {
    this.sumThreadService.currentThreadID.subscribe(idNum => this.receivedThreadID = idNum)
    this.receivedThreadItem = this.sumThreadService.getSelectedThreadItem();
    this.getResponses();
  }

  public getReceivedThreadItem(): SummaryThread_Prev {
    return this.receivedThreadItem;
  }

  getResponses(): Array<responses> {
    this.expThreadService.getThreadResponses(this.receivedThreadID)
    .subscribe(etr => this.responseList = etr);

    console.log(this.responseList)
    return this.responseList
  }

}
