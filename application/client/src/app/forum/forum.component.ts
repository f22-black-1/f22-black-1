import { Component, OnInit } from '@angular/core';
import { SummaryThread } from '../summary-thread';

import { MatButtonModule } from '@angular/material/button';
import { SummaryThreadService } from '../summary-thread.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  summaryThreadList: SummaryThread[] = [];
  summaryThread!: SummaryThread;
  testVar!: number;

  constructor(private summaryThreadService: SummaryThreadService) {
    this.testVar = 5;
  }
  
  ngOnInit(): void {
    this.getThreads();
  }

  getThreads(): Array<SummaryThread> {
    // alert("function start")
    this.summaryThreadService.getThreads()
    // .subscribe(summaryThreadList => this.summaryThreadList = summaryThreadList);
    .subscribe(wtf => this.summaryThreadList = wtf);

    console.log(this.summaryThreadList)
    // alert("function end")
    return this.summaryThreadList
  }

  printItem(tid: number): void {
    alert("message - testVar: " + this.testVar)
    alert("Id " + tid + " subject: " + this.summaryThreadList[tid].subject)
  }

  testIt()
  {
    alert("This is a test message")
  }


}
