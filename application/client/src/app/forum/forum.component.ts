import { TemplateBindingParseResult } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SummaryThread, SummaryThread_Prev, PestTypeFilter } from '../summary-thread';
import { SummaryThreadService } from '../summary-thread.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  summaryThreadList: SummaryThread_Prev[] = [];
  summaryThread_Prev!: SummaryThread_Prev;

  stl2: SummaryThread[] = [];
  summaryThread!: SummaryThread;
  stlIndex: number = 0;
  threadIndexList: number[] = [];
  indexCount: number = 0;
    
  testStr: string = "";
  
  constructor(public summaryThreadService: SummaryThreadService) {
    this.updateTempThreadList();
  }
  
  ngOnInit(pestTypeFilter: string = ""): void {
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

  //
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
        return x;
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
    console.log('selected thread id: ' + this.summaryThreadList[selectedIndex].threadid);
    this.summaryThreadService.updateSelectedThreadItem(this.summaryThreadList[selectedIndex]);
  }

  applyPestTypeFilter(pType: string): void {
    this.ngOnInit(pType);
  }

  printItem(tid: number): void {
    alert(this.stl2[3].subject)
  }

  testIt(arrayId: string)
  {
    console.log("testIt value received: " + arrayId);
    console.log("array size: " + this.summaryThreadList.length);
    console.log("selected index: " + this.getSelectedIndex(arrayId));
  }

  updateTempThreadList()
  {
    let st0: SummaryThread = {
      threadid: 0,
      incidentid: 0,
      locid: 0,
      creatorid: "DMueller",
      createdate: new Date("2022-03-23"),
      subject: "Family of coyotes off Hoadly Rd?",
      comment: "There's a family of coyotes off Hoadly right across the street from the Harris Teeter.  " + 
      "I've seen them dart across the road multiple times so be careful when you're driving through there.",
      imagePath: "../../assets/Incident_Report_Images/PestImage_Coyote.PNG",
      iconPath: "../../assets/Incident_Report_Images/Incident_Coyote.png",
      views: 104,
      responses: 20,
      positiveFeedback: 11,
      negativeFeedback: 3,
      locVerified: false,
      imgVerified: true
    }

    let st1: SummaryThread = {
      threadid: 1,
      incidentid: 1,
      locid: 1,
      creatorid: "JClay",
      createdate: new Date("2022-04-07"),
      subject: "Field mice in garden",
      comment: "For whatever reason I have had a huge number of field mice in my garden this season. " +
      "Does anybody know what would be attracting them?  My garden is strictly flowers.  I'm not growing anything that " + 
      "would be considered a food source - as far as I'm aware.",
      imagePath: "../../assets/Incident_Report_Images/PestImage_Field_Mouse.PNG",
      iconPath: "../../assets/Incident_Report_Images/Incident_Rodent.png",
      views: 23,
      responses: 2,
      positiveFeedback: 5,
      negativeFeedback: 0,
      locVerified: false,
      imgVerified: false
    }  

    let st2: SummaryThread = {
      threadid: 2,
      incidentid: 2,
      locid: 2,
      creatorid: "IAnderson",
      createdate: new Date("2022-04-10"),
      subject: "Watch out for copperhead by the creek",
      comment: "There's definitely a copperhead by the creek next to the neighborhood playground so be " + 
      "sure to keep your kids away from it.  It looks like it might be multiple copperheads because I've seen them too " +
      "frequently to just be one.",
      imagePath: "../../assets/Incident_Report_Images/PestImage_Copperhead.PNG",
      iconPath: "../../assets/Incident_Report_Images/Incident_Snake.png",
      views: 403,
      responses: 3,
      positiveFeedback: 40,
      negativeFeedback: 1,
      locVerified: true,
      imgVerified: true
    }

    let st3: SummaryThread = {
      threadid: 3,
      incidentid: 3,
      locid: 3,
      creatorid: "KDecker",
      createdate: new Date("2022-04-02"),
      subject: "Bit by tick",
      comment: "It seems a little early in the season, but I found a lonestar tick feeding on me after my " + 
      "evening walk.  I don't even recall walking brushing up against any tall grass/vegetation, but somehow it still found me.",
      imagePath: "../../assets/Incident_Report_Images/PestImage_Lonestar_Tick.PNG",
      iconPath: "../../assets/Incident_Report_Images/Incident_Tick.png",
      views: 55,
      responses: 2,
      positiveFeedback: 10,
      negativeFeedback: 3,
      locVerified: false,
      imgVerified: false
    }

    this.stl2.push(st0);
    this.stl2.push(st1);
    this.stl2.push(st2);
    this.stl2.push(st3);
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
