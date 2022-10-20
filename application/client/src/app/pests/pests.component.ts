import { Component, OnInit } from '@angular/core';

import { Pest } from '../pest';
import { PestService } from '../pest.service';

// This component will be used to retrieve all the pests

@Component({
  selector: 'app-pests',
  templateUrl: './pests.component.html',
  styleUrls: ['./pests.component.css']
})
export class PestsComponent implements OnInit {
  pests: Pest[] = [];
  pest!: Pest;


  constructor(private pestService: PestService) { }

  ngOnInit(): void {
    this.getPests();
  }

  getPests(): Array<Pest> {
    this.pestService.getPests()
    .subscribe(pests => this.pests = pests);

    console.log(this.pests)

    return this.pests
    
  }

  createPest(pest: Pest): Array<Pest> {
    this.pestService.createPest(pest)
    .subscribe(pestid => this.pest.pestid = pestid);

    console.log(this.pests)

    return this.pests
    
  }

  deletePest(pest: Pest): Array<Pest> {
    this.pestService.deletePest(pest)
    return this.pests
    
  }

  updatePest(pest: Pest): Array<Pest> {
    this.pestService.updatePest(pest)
    .subscribe(pestid => this.pest.pestid = pestid);

    console.log(this.pests)

    return this.pests
    
  }
}