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
import { Pest } from '../pest';
@Component({
  selector: 'child-component',
  templateUrl: './pest-report.component.html',
  styleUrls: ['./pest-report.component.css']
})
export class PestReportComponent implements OnInit {

  message: string = "Hello!"
  dialog!:MatDialog;
  pests: Pest[] = [];
  pest!: Pest;

  @Output() messageEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.getPests();
  }


  constructor(private pestService: PestService) { }

  getPests(): Array<Pest> {
    this.pestService.getPests()
    .subscribe(pests => this.pests = pests);

    console.log(this.pests)

    return this.pests
    
  }

  sendMessage() {
    console.log(`Sending.... ${this.message}`);
    this.messageEvent.emit(this.message)
  }

  map = new MapComponent(this.dialog);


  

}
  