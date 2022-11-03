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

  constructor() { }
 
  ngOnInit(): void {
  }

  getPestID(val: string){
    this.pest.pestid = val;
    
  }
}
