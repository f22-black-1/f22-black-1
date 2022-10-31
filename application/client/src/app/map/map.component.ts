import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { JsonPipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PestReportComponent } from '../pest-report/pest-report.component';

import * as mapStyle from "./map.component.style.json";
//import { PestLocation } from '../pest';

// See: https://github.com/angular/components/blob/main/src/google-maps/README.md

class Incident {
  pestLoc!: String;
}

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  constructor(
    private  dialogRef : MatDialog
    ) {}
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  ret = false
  mapHeight = "900px";
  mapWidth = "1720px"
  // mapZoom = 15;
  mapCenter!: google.maps.LatLng;
  markerPositions: google.maps.LatLngLiteral[] = [];
  center: google.maps.LatLngLiteral = {lat: 36.87583441244073, lng: -76.2905416411255};
  zoom = 15;
   
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 12,
    //gestureHandling: "none",
    styles: mapStyle
  };

  iconBase = 'https://cs.odu.edu/~411black/assets/';


  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };


  incident = new Incident;
  

  ngOnInit() {

    this.markerOptions.visible = false

    // TODO: figure out what is going on with the callback... we should be able to place a 
    // different marker based on the location permissions
    this.getCurrentLocation()
    // console.log(this.markerPositions)
    // if (true) {
    //   // Default Position is ODU
    //   const point: google.maps.LatLngLiteral = {
    //     lat: 36.8862699,
    //     lng: -76.3097248,
    //   };
    //   this.mapCenter = new google.maps.LatLng(point);
    
    this.markerOptions.icon = this.iconBase + 'donatello.png'
    // }
    // else {
    //   this.markerOptions.icon = this.iconBase + 'raphael.png'   
    //   this.markerOptions.visible = true
    // }
  }
  
  openInfoWindow(marker: MapMarker) { 
    // this is called when the marker is clicked.
    this.markerInfoContent = "I'm here!";
    this.infoWindow.open(marker);
  }

  
  getCurrentLocation() {

    if (!navigator.geolocation) {
      console.log('Your browser does not support the geolocation feature');     
    }
    
    navigator.geolocation.getCurrentPosition(
      
      (position: GeolocationPosition) => { 
        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.mapCenter = new google.maps.LatLng(point);
        this.map.panTo(point);
        this.markerPositions.push(point)
      },
       
    );
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


  // addMarker(event: google.maps.MapMouseEvent, markerOptions: google.maps.MarkerOptions) {
  //   this.markerOptions.visible = markerOptions.visible
  //   this.markerOptions.icon = markerOptions.icon
    
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

  addMarker($event: Event) {
    console.log(`Adding marker ...`)
    // Somehow this needs to be able to get data from the marker object
  }

  

  addVisibleMarker(event: google.maps.MapMouseEvent, markerOptions: google.maps.MarkerOptions) {
     this.markerOptions.visible = markerOptions.visible
     this.markerOptions.icon = markerOptions.icon
    
     this.markerPositions.push(event.latLng!.toJSON());
     console.log(`Added marker to ${event.latLng!}` )

     //return event.latLng
    
  }

  addInvisibleMarker(event: google.maps.MapMouseEvent, markerOptions: google.maps.MarkerOptions) {
    this.markerOptions.visible = false
    this.markerOptions.icon = markerOptions.icon
    if (event.latLng) {
      this.markerPositions.push(event.latLng.toJSON());
    }
    
    let location = String(event.latLng!);

    this.getReportAndSetMarker(location)
    
  }

  setMarker(location: String) {
    console.log(`Set Marker: ${location}`)
    this.incident.pestLoc = location;

  }

  getMarker() {
    console.log(`currentLocation: ${this.incident.pestLoc}`)
    return this.incident.pestLoc
  }

  getReportAndSetMarker(location: string) {
    console.log(`Getting report for location: ${location}`)
    this.setMarker(location) 

    this.dialogRef.open(PestReportComponent);
    
    this.getMarker()

  }
  
}