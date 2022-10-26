import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { PestsComponent } from './../pests/pests.component';
import { PestService } from '../pest.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule} from '@angular/material/input'

@Component({
  selector: 'dialog-overview-example',
  templateUrl: './pest-report.component.html',
  styleUrls: ['./pest-report.component.css']
})
export class PestReportComponent {

}
  