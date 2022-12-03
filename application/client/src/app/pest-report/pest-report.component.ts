import { Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import { MapComponent } from './../map/map.component'
import { PestsComponent } from './../pests/pests.component';
import { PestService } from '../pest.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule} from '@angular/material/input'
import { Pest, PestType } from '../pest';
import { MatOptionSelectionChange } from '@angular/material/core';
// import {FlexModule} from '@angular/flex-layout';

@Component({
  selector: 'child-component',
  templateUrl: './pest-report.component.html',
  styleUrls: ['./pest-report.component.css']
})
export class PestReportComponent implements OnInit {

  message: string = "Pest has been Reported!"
  dialog!:MatDialog;
  pests: Pest[] = [];
  pest!: Pest;
  pestTypes: PestType[] = [];
  pestType!: PestType;

  @Output() messageEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.getPestTypes();
  }


  constructor(private pestService: PestService) { }

  map = new MapComponent(this.dialog, this.pestService);

  getPests(): Array<Pest> {
    this.pestService.getPests()
    .subscribe(pests => this.pests = pests);

    console.log(this.pests.length)

    return this.pests
    
  }

  getPestTypes(): Array<PestType> {
    this.pestService.getPestTypes()
    .subscribe(pestTypes => this.pestTypes = pestTypes);

    return this.pestTypes
    
  }

  onSelected(event: MatOptionSelectionChange, value:PestType): void {
		this.pestType = value;
    console.log(this.pestType);
	}
 
  sendMessage(value: PestType, comments: String, image: String) {
    this.pestType = value;
    let pestTypeStr = JSON.stringify(this.pestType);
    console.log(`Sending....`)

    // TODO: send the content of these console.logs to the backend
    console.log(comments);
    // NOTE:  Since we will not be using something like S3 to store images, 
    // this functionality will just allow us to add a pre-determined image 
    // with its known path to the database, and allow the Info Window to 
    // populate that image accordingly
    console.log(image)   
    console.log(pestTypeStr);
    
    alert(`New ${this.pestType.pesttype} reported!`)

    // Populate the map with the correct pest type for the correct marker
    this.map.setPestTypeFromReport(this.pestType.pesttype)

    // TODO: this.map.setInfoWindowImageFromReport(...)
    // TODO: this.map.setInfoWindowTextFromRepot(...)

  }



  

}
  