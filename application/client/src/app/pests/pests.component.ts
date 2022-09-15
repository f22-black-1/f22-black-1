import { Component, OnInit } from '@angular/core';

import { Pest } from '../pest';
import { PestService } from '../pest.service';

@Component({
  selector: 'app-pests',
  templateUrl: './pests.component.html',
  styleUrls: ['./pests.component.css']
})
export class PestsComponent implements OnInit {
  pests: Pest[] = [];

  constructor(private pestService: PestService) { }

  ngOnInit(): void {
    this.getPests();
  }

  getPests(): void {
    this.pestService.getPests()
    .subscribe(pests => this.pests = pests);
  }
}