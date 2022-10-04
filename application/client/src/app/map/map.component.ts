import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { JsonPipe } from '@angular/common';

import * as mapStyle from "./map.component.style.json";
import examplePestIcon from "./pest.png";

// See: https://github.com/angular/components/blob/main/src/google-maps/README.md

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor() {}
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  mapHeight = "700px";
  mapWidth = "1800px"
  mapZoom = 15;
  mapCenter!: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
    //gestureHandling: "none",
    styles: mapStyle
  };

  iconBase = 'https://cs.odu.edu/~411black/application/client/src/assets/';

  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  ngOnInit() {

    let locAllowed = this.getCurrentLocation();
    if (!locAllowed) {
      // Default Position is ODU
      const point: google.maps.LatLngLiteral = {
        lat: 36.8862699,
        lng: -76.3097248,
      };
      this.mapCenter = new google.maps.LatLng(point);
      this.markerOptions.visible = true
      
      this.markerOptions.icon = this.iconBase + 'donatello.png'
    }
  }
  
  openInfoWindow(marker: MapMarker) { 
    // this is called when the marker is clicked.
    this.markerInfoContent = "I'm here!";
    this.infoWindow.open(marker);
  }

  getCurrentLocation(): boolean {
    if (!navigator.geolocation) {
      console.log('Your browser does not support the geolocation feature');
      return false
    }
    navigator.geolocation.getCurrentPosition(
      

      (position: GeolocationPosition) => { 
  
        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        this.mapCenter = new google.maps.LatLng(point);
        this.map.panTo(point);
        this.markerOptions.visible = true

        this.markerOptions.icon = this.iconBase + 'raphael.png'
  
  
        // this.markerOptions = {
        //   draggable: false,
        //   animation: google.maps.Animation.DROP,
        // };
        return true
      },

    );
    return false
  }

  //@ViewChild('mapContainer', { static: false })
  //map: ElementRef;
  //infoWindow!: MapInfoWindow;
  //apiLoaded: Observable<boolean>;


  // TODO: Try to determine what this HttpClient does
  // constructor(httpClient: HttpClient) {

  //   this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCVbhnCSH7RXZW3ojx_mqB0IZe6FfOkA6Q', 'callback')
  //       .pipe(
  //         map(() => true),
  //         catchError(() => of(false)),
  //       );
  // }


  // addMarker(event: google.maps.MapMouseEvent) {
  //   this.markerPositions.push(event.latLng!.toJSON());
  //   console.log(`Added marker to ${event.latLng!}` )
  // }

  // moveMap(event: google.maps.MapMouseEvent) {
  //   if(event.latLng!= null)
  //   this.center = (event.latLng.toJSON());
  // }

  // move(event: google.maps.MapMouseEvent) {
  //   if(event.latLng != null)
  //   this.display = event.latLng.toJSON();
  // }

  // openInfoWindow(marker: MapMarker) {
  //   this.infoWindow.open(marker);
  //   console.log("Opening an info window...")
  // }


  
}