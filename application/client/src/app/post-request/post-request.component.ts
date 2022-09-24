import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Pest } from '../pest';

@Component({
  selector: 'post-request-typed',
  templateUrl: './post-request.component.html',
  styleUrls: ['./post-request..component.css']
})
export class PostRequestTypedComponent implements OnInit {

  pestObj = {
    pestId: 1,
    pestType: "ants",
    xCoord: 100,
    yCoord: -120
  }

    constructor(private http: HttpClient) { }

    ngOnInit() {  
      
        // Send the pestObj to the Middleware
        this.http.post<Pest>('http://localhost:8080/api/pest/create', this.pestObj).subscribe(data => {
            
          // TODO: Figure out what this does
          this.pestObj.pestId = data.pestId
          this.pestObj.pestType = data.pestType
          this.pestObj.xCoord = data.xCoord
          this.pestObj.yCoord = data.yCoord

        })
    }
}
