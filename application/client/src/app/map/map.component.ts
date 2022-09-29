import { Component, OnInit } from '@angular/core';
// https://timdeschryver.dev/blog/google-maps-as-an-angular-component
@Component({
  selector: 'app-googlemap',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  // marker = new google.maps.Marker({
  //   position: odu,
  //   map: map,
  // });

  ngOnInit(): void {
  }
  display : any;
  center: google.maps.LatLngLiteral = {lat: 36.8862699, lng: -76.3097248 };
  zoom = 15;

  moveMap(event: google.maps.MapMouseEvent) {
    if(event.latLng!= null)
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if(event.latLng != null)
    this.display = event.latLng.toJSON();
  }


  
}