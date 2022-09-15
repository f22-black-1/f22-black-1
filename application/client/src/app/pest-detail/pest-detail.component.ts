import { Component, OnInit } from '@angular/core';
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
    private route: ActivatedRoute,
    private pestService: PestService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPest();
  }

  getPest(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pestService.getPest(id)
      .subscribe(pest => this.pest = pest);
  }

  goBack(): void {
    this.location.back();
  }
}