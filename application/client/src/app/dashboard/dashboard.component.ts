import { Component, OnInit } from '@angular/core';
import { Pest } from '../pest';
import { PestService } from '../pest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  pests: Pest[] = [];

  constructor(private PestService: PestService) { }

  ngOnInit(): void {
    this.getPests();
  }

  getPests(): void {
    this.PestService.getPests()
      .subscribe(pests => this.pests = pests.slice(0, 5));
  }
}