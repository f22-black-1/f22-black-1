import { Component, OnInit } from '@angular/core';

import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
  }

  radioSelected:string="";
  pestOptionArray:string[] = ["ALL", "Ant", "Bee", "Canine", "Feline", "Racoon", "Snake", "Wasp", "Unknown"];

}
