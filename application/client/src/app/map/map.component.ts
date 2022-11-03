import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { JsonPipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PestReportComponent } from '../pest-report/pest-report.component';
import { PestService } from '../pest.service';
import * as mapStyle from "./map.component.style.json";
import { Pest, Incident} from '../pest';
//import { PestLocation } from '../pest';

// See: https://github.com/angular/components/blob/main/src/google-maps/README.md


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {
  

  constructor(
    private  dialogRef : MatDialog,
    private pestService: PestService
    ) {}
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  mapHeight = "900px";
  mapWidth = "1720px"
  mapCenter: google.maps.LatLngLiteral = {lat: 36.87583441244073, lng: -76.2905416411255};
  mapZoom = 15;
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
  display!: google.maps.LatLngLiteral;

  move(event: google.maps.MapMouseEvent) {
    
      this.display = event.latLng.toJSON();
    
  }


  markerPositions: google.maps.LatLngLiteral[] = [];
  markerIcon: string;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };
 
  markerInfoContent = '';
  openInfoWindow(marker: MapMarker, position: google.maps.LatLngLiteral) { 
    // this is called when the marker is clicked.

    this.infoWindow.open(marker);

    console.log(`Marker positions: {${position.lat}, ${position.lng}}`)
  }

  getMarkerIcon() {

    return this.markerIcon;
  }

  setMarkerIcon(icon: string) {

    this.markerIcon = icon;
  }


  addVisibleMarker(event: google.maps.MapMouseEvent) {
         
    this.markerPositions.push(event.latLng!.toJSON());
    console.log(`Added marker to ${event.latLng!}` )
   
 }

  getIncidents(): void {
    this.pestService.getIncidents().subscribe( async data => {
      const incidents = await data;

      // Work with incidents
      for (let incident in incidents) {
        let xcoord = parseFloat(incidents[incident].xcoord) 
        let ycoord = parseFloat(incidents[incident].ycoord)
        console.log({lat: xcoord, lng: ycoord})

        // Need to have pesttype here so we can if check the icon
        console.log(incidents)
        if (incidents[incident].pestid == '55884984-3891-4c9c-b8d0-8526c65d5588') {
          this.setMarkerIcon(this.iconBase + 'donatello.png')
          this.markerPositions.push({lat: xcoord, lng: ycoord});
        }
        if (incidents[incident].pestid == 'b0b6c409-f67d-4646-be93-0bd4d1111ff4') {
          this.setMarkerIcon(this.iconBase + 'raphael.png')
          this.markerPositions.push({lat: xcoord, lng: ycoord});
        }
        
        // this.markerPositions.push({lat: xcoord, lng: ycoord});
      }
    }
  )}

  getReportAndSetMarker(event: google.maps.MapMouseEvent) {
    console.log(`Getting report....`)
    this.addVisibleMarker(event) 
    this.dialogRef.open(PestReportComponent);

  }
  



  ngOnInit() {

    console.log(`Centering map on ${this.mapCenter.lat}, ${this.mapCenter.lng}`);

    this.getIncidents();

  }
  




}