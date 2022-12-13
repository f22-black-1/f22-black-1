import { Component, OnInit } from '@angular/core';

import { Pest } from '../pest';
import { PestDetailComponent } from '../pest-detail/pest-detail.component';
import { PestService } from '../pest.service';

@Component({
  selector: 'app-pest-update',
  templateUrl: './pest-update.component.html',
  styleUrls: ['./pest-update.component.css']
})
export class PestUpdateComponent implements OnInit {
  pest: Pest = {
    pestid: "",
    pestname: "",
    pesttype: "",
    severity: "",
    pestdescription: "",
    pestimage: ""
  }
  pests: Pest[] = []

  test: string [] = []
  test2: string = ""

  constructor(private pestService: PestService) { }

  ngOnInit(): void {
    this.pestService.getPests().subscribe(pests => this.pests = pests)
  }

  splitString(){
    this.test = this.pest.pestname.split(" ");
    console.log(this.test);
    this.test.push("(");
    this.test2 = "";
    let str1: string = "";
    let str: string = "";
    let i: number = 0;
    console.log(this.test.length);
    while(!(this.test[i].includes("("))){
      console.log(i);
      if(i > 0)
        str = this.test[i].toLowerCase();
      else
      str = this.test[i];
      str1 += str + "_";
      i++;
    }
    let c: number =0;
    this.test2 = str1.substring(0,str1.length-1);
    console.log(this.test2);
    
  }
  

  getPestDetails(val: string){
    this.pest.pestid = val;
    this.pestService.getAPest(this.pest).subscribe( 
    async data => {  const pests = await data;   console.log(pests);
      this.pest.pestname = pests[0].pestname;
      this.pest.pesttype = pests[0].pesttype;
      this.pest.severity = pests[0].severity;
      this.pest.pestdescription = pests[0].pestdescription;
      this.pest.pestimage = pests[0].pestimage;
    });    
  }

  updatePest(pn: string, ptype: string, psev: string, pdesc: string){
    this.pest.pestname = pn;
    this.pest.pesttype = ptype;
    this.pest.severity = psev;
    this.pest.pestdescription = pdesc;
    
    console.log(this.pest);
    this.pestService.updatePest(this.pest).subscribe(
    async data => {});
  alert("The Pest Has Been Updated");
    this.pest.pestid= "";
    this.pest.pestname="";
    this.pest.pesttype= "";
    this.pest.severity= "";
    this.pest.pestdescription= "",
    this.pest.pestimage= "";
  }


}
