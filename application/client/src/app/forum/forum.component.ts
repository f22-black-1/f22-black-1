import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SummaryThread, SummaryThread_Prev, PestTypeFilter, ThreadInput, 
  IncidentData, PestRepID, NewThreadData, ThreadID, NewOriginalResponse } from '../summary-thread';
import { SummaryThreadService } from '../summary-thread.service';
import { ExpandedThreadService} from '../expanded-thread.service';
import { ThreadComponent } from '../thread/thread.component';
import { CurrentUser } from '../login'
import { UserinfocardComponent } from '../userinfocard/userinfocard.component';
import { UserinfoService } from '../userinfo.service';
import { UserInfo, CurrentUser_t } from '../userinfo';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  summaryThreadList: SummaryThread_Prev[] = [];
  summaryThread_Prev!: SummaryThread_Prev;

  //For new thread discussion creation process
  selectedThread!: SummaryThread_Prev;
  selectedIndex: number;
  creationTimeStamp: Date;
  newIncidentID: string;
  newThreadID: ThreadID;
  ntidString: string;

  stl2: SummaryThread[] = [];
  summaryThread!: SummaryThread;
  stlIndex: number = 0;
  threadIndexList: number[] = [];
  indexCount: number = 0;
    
  newInput: ThreadInput;
  inputTitle: string;
  inputComment: string;

  currentUser: CurrentUser;

  modalThread: string;

  iconPathDefault: string = "";
  imgPathDefault: string = "../../assets/logo/Pest_Patrol_Logo.svg";

  
  constructor(public summaryThreadService: SummaryThreadService, public expThreadService: ExpandedThreadService,
    public threadCreationWindow: MatDialog, public infoCard: MatDialog, public uiService: UserinfoService) {}
  
  ngOnInit(pestTypeFilter: string = ""): void {
    this.currentUser = this.uiService.activeUser(); //temp -- be sure to replace when permanent method is developed

    if(pestTypeFilter.length > 0)
    {
      //forum applies pest type filter before opening
      this.getThreadsWithFilter(pestTypeFilter);
    }
    else
    {
      //forum opens with no pest type filter
      this.getThreads();
    }
  
    this.generateIndexes();
  }

  openUserInfoCard(uID: string, uName: string): void {
    let selectedUser: CurrentUser = {
      userid: uID,
      username: uName,
    }
    const userInfo = this.infoCard.open(UserinfocardComponent, {
      data: {userid: selectedUser.userid, username: selectedUser.username}
    });

    userInfo.afterClosed().subscribe(result => {this.modalThread = result;
      if(this.modalThread != undefined)
        this.summaryThreadService.expandThread(this.modalThread);
      else
        console.log("matdialog error");
    });

    console.log("Selected comp thread: " + this.modalThread);
  }

  openThreadCreationWindow(repID: string): void {
    const entryInt = this.threadCreationWindow.open(ThreadComponent, {
      width: '350px',
      // threadinput: {title: this.inputTitle, comment: this.inputComment}
      data: {subject: this.inputTitle, comment: this.inputComment}
    });

    // entryInt.afterClosed().subscribe(result => {console.log("window closed"); this.newInput = result;
    // console.log("new input title" + this.newInput.title + " -- new input comment" + this.newInput.comment);
    // this.createNewDiscussionThread(repID);
    entryInt.afterClosed().subscribe(result => {this.newInput = result; this.createNewDiscussionThread(repID);});

    console.log("double outside function: " + this.ntidString);
  }

  generateUser(): CurrentUser {
    let tempUser: CurrentUser = {
      userid: "12d09e49-2368-44d8-b21c-1b8e10c7cb2e",
      username: "KDecker",
    }
    return tempUser;
  }

  //this plugs into the backend
  //goes to the summary Thread service
  getThreads(): Array<SummaryThread_Prev> {
    this.summaryThreadService.getThreads()
    .subscribe(stlp => this.summaryThreadList = stlp);

    console.log(this.summaryThreadList)
    return this.summaryThreadList
  }

  getThreadsWithFilter(pType: string): Array<SummaryThread_Prev> {
    let pTypeFilter: PestTypeFilter = {
      pesttype: pType,
    }

    this.summaryThreadService.getThreadsWithFilter(pTypeFilter)
    .subscribe(stlp => this.summaryThreadList = stlp);

    console.log(this.summaryThreadList)
    return this.summaryThreadList
  }

  getSelectedIndex(threadNum: string): number {
    for(let x = 0; x < this.summaryThreadList.length; x++)
    {
      if(threadNum === this.summaryThreadList[x].threadid)
      {
        this.selectedIndex = x;
        return x;
      }
    }   
    return 0;
  }

  getSelectedIndexRepID(reportID: string): number {
    for(let x = 0; x < this.summaryThreadList.length; x++)
    {
      if(reportID === this.summaryThreadList[x].reportid)
      {
        return x;
      }
    }   
    return 0;
  }

  generateIndexes(): void {
    for(let x = 0; x < this.summaryThreadList.length; x++)
    {
      this.threadIndexList.push(x);
    }
  }

  incrementIndex(): void {
    this.stlIndex++;
  }

  resetIndex(): void {
    this.stlIndex = 0;
  }

  sendSelectedIndex(tid: string): void {
    var selectedIndex = this.getSelectedIndex(tid);
    this.summaryThreadService.updateSelectedThread(tid); //temp -- remove later
    this.expThreadService.selectedThread = this.summaryThreadList[selectedIndex];
    console.log('selected thread id: ' + this.summaryThreadList[selectedIndex].threadid);
    this.summaryThreadService.updateSelectedThreadItem(this.summaryThreadList[selectedIndex]);
  }

  applyPestTypeFilter(pType: string): void {
    this.ngOnInit(pType);
  }
  
  // getNewThreadID(incidentID: PestRepID): PestRepID {
  //   this.summaryThreadService.getThreadID(incidentID).subscribe(
  //     (data)=>{}),
  //     (_err: any)=>{console.log("Error");
  //   };
  // } 

  createNewDiscussionThread(repID: string): void {
    this.selectedIndex = this.getSelectedIndexRepID(repID);
    this.selectedThread = this.summaryThreadList[this.selectedIndex];
    this.creationTimeStamp = new Date();

    console.log("attempting to create new discussion thread for reportID: " + repID);

    let newIncidentData: IncidentData = {
      reportid: this.selectedThread.reportid,
      locid: this.selectedThread.locid,
      submitterid: this.selectedThread.submitterid,
      pestid: this.selectedThread.pestid,
      reportdate: this.creationTimeStamp
    }

    console.log("on step 1 - adding incident");

    this.summaryThreadService.addNewIncident(newIncidentData).subscribe(
      (data)=>{}), 
      (_err: any)=>{console.log("Error");
    };

    let newThreadData: NewThreadData = {
      incidentid: this.selectedThread.reportid,
      locid: this.selectedThread.locid,
      creatorid: this.currentUser.userid,
      createdate: this.creationTimeStamp,
      subject: this.newInput.title,
      comment: this.newInput.comment
    }

    console.log("on step 2 - adding thread");

    this.summaryThreadService.addNewThread(newThreadData).subscribe(
      id => {this.createFirstThreadResponse(id);});


    console.log("on step 2 - adding activity");

    this.summaryThreadService.addNewActivity(newThreadData).subscribe(
      (data)=>{});

    console.log("outside function ntidString: " + this.ntidString);

  }

  createFirstThreadResponse(newID: any): void {
    console.log("newID: " + newID.threadid);
    this.ntidString = newID.threadid.toString();
    console.log("function ntidString: " + this.ntidString);

    let firstResponse: NewOriginalResponse = {
      responseid: this.ntidString,
      userid: this.currentUser.userid,
      responsedate: this.creationTimeStamp,
      comment: "Original_Thread",
    }

    this.summaryThreadService.addFirstResponse(firstResponse).subscribe(data => this.ngOnInit());
  }

  printItem(): void {
    console.log("current user: " + this.currentUser.username);
    console.log("current user (service): " + this.uiService.activeUser().username);
  }

  testIt(arrayId: string)
  {
    console.log("testIt value received: " + arrayId);
    console.log("array size: " + this.summaryThreadList.length);
    console.log("selected index: " + this.getSelectedIndex(arrayId));
  }

  //see pestOptionArray of filter componet for all of pest types
  pestTypeSelected: string = "ALL";
  
  onRadioButtonChanged(pestType: string){
    this.pestTypeSelected = pestType;
    console.log(this.pestTypeSelected + " forum onRadioButtonChanged")

    if(this.pestTypeSelected === "ALL")
    {
      this.ngOnInit();
    }
    else
    {
      this.applyPestTypeFilter(this.pestTypeSelected);
    }
  }

}


