import {Component, ViewChild, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';

// See: https://github.com/angular/components/blob/main/src/google-maps/README.md

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow)
  infoWindow!: MapInfoWindow;
  apiLoaded: Observable<boolean>;

  // TODO: Try to determine what this HttpClient does
  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCVbhnCSH7RXZW3ojx_mqB0IZe6FfOkA6Q', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  display : any;
  center: google.maps.LatLngLiteral = {lat: 36.8862699, lng: -76.3097248 };
  zoom = 15;

  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = {
    label: {
      color: 'green',
      text: 'Marker label',
    },
    animation: google.maps.Animation.BOUNCE
  };



  ngOnInit(): void {
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng!.toJSON());
    console.log(`Added marker to ${event.latLng!}` )
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if(event.latLng!= null)
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if(event.latLng != null)
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
    console.log("Opening an info window...")
  }


  
}