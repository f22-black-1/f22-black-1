import { Component, OnInit, Inject } from '@angular/core';
import { ThreadInput } from '../summary-thread';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  constructor(public entryInt: MatDialogRef<ThreadComponent>, @Inject(MAT_DIALOG_DATA) public threadinput: ThreadInput) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.entryInt.close();
  }

}
