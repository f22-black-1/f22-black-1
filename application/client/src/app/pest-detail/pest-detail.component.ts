import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pest } from '../pest';
import { PestService } from '../pest.service';

@Component({
  selector: 'app-pest-detail',
  templateUrl: './pest-detail.component.html',
  styleUrls: [ './pest-detail.component.css' ]
})
export class PestDetailComponent implements OnInit {
  pest: Pest | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private pestService: PestService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let id = this.getPestId();

    // // Send the pestObj to the Middleware
    // this.http.post<Pest>(`http://localhost:8080/api/pests/${id}`, {id: `${id}`}).subscribe(data => {
    
    // // TODO: Figure out what this does
    // //id = data.id

    // })
  }

  getPestId(): Number {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(`ideeeeee: ${id}`)
    this.pestService.getPest(id)
      .subscribe(pest => this.pest = pest);

    return id
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.pest) {
      console.log(this.pest)
      this.pestService.updatePest(this.pest)
        .subscribe(() => this.goBack());
    }
  }
}