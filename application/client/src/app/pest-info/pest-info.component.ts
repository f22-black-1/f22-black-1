import { Component, OnInit } from '@angular/core';
import { PestService } from '../pest.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from '@angular/core';
import { Pest } from '../pest';
@Component({
  selector: 'pest-info',
  templateUrl: './pest-info.component.html',
  styleUrls: ['./pest-info.component.css']
})

export class PestInfoComponent implements OnInit {

  message: string = "Displaying pest info..."
  dialog!: MatDialog
  incidentID!: string
  pest: Pest

  constructor(private pestService: PestService, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.incidentID = data.incidentID
  }

  ngOnInit(): void {
    this.pestService.getAPestByIncidentID(this.incidentID)
      .subscribe(data => this.pest = data);
  }

}
