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

  pests: Pest
  test: string [] = []
  test2: string = ""

  constructor(private pestService: PestService, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.incidentID = data.incidentID
  }

  ngOnInit(): void {
    console.log("this is a test");
    this.pestService.getAPestByIncidentID(this.incidentID).subscribe( async data => { 
      const Pest = await data;

      this.pest = Pest;
      this.splitString();
    });
  }

  splitString(){
    console.log("this is a test 2");
    console.log(this.pest.pestname);

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
  

}
