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
    });    
  }

  updatePest(){
    this.pestService.updatePest(this.pest).subscribe(
    async data => {  
  });
  }


}
