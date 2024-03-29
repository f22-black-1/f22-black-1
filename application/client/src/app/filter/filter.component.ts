import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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

  radioSelected:string="ALL";
  pestOptionArray:string[] = ["ALL", "Ant", "Bear", "Bee", "Canine", "Caterpillar", "Feline", "Fox", "Pig", "Plant","Racoon", "Rodent", "Snake", "Tick", "Wasp", "Unknown"];

  @Output()
  filterSelectedChanged: EventEmitter<string> = new EventEmitter<string>();

  onFilterSelectedChanged(){
    this.filterSelectedChanged.emit(this.radioSelected);
    // console.log(this.radioSelected+" onFilterSelectecchanged()");
  }

}
