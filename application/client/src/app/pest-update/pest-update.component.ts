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

  constructor(private pestService: PestService) { }


 
  ngOnInit(): void {
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
