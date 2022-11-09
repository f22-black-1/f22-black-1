import {Component, ViewChild, OnInit, ElementRef, SimpleChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { JsonPipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PestReportComponent } from '../pest-report/pest-report.component';
import { PestService } from '../pest.service';
import * as mapStyle from "./map.component.style.json";
// TODO: Merge Pest and Incident Data Structures
import { Pest, Incident} from '../pest';


// See: https://github.com/angular/components/blob/main/src/google-maps/README.md


class ReportedPest {
  position: google.maps.LatLngLiteral = null;
  options: google.maps.MarkerOptions = {icon: null};
}

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
  @ViewChild(GoogleMap, { static: false }) GoogleMap!: GoogleMap;
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
    styles: mapStyle
  };

  iconBase = '../../assets/icons/';
  display!: google.maps.LatLngLiteral;

  move(event: google.maps.MapMouseEvent) {

      this.display = event.latLng.toJSON();
  }

  markers: google.maps.Marker[] = [];
  marker: google.maps.Marker;

  markerInfoContent = '';
  openInfoWindow(marker: MapMarker, position: google.maps.LatLngLiteral) { 
    this.infoWindow.open(marker);
    console.log(`Info Window for Marker positions: {${position.lat}, ${position.lng}}`)
  }

  markerOptions: google.maps.MarkerOptions[] = [{
    draggable: false,
    animation: google.maps.Animation.DROP,
    icon: ""
  }];

  reportedPests: ReportedPest[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    let position = event.latLng!.toJSON()

    let reportedPest = new ReportedPest();
    reportedPest.position = position;

    // TODO: Don't let the marker be visible until after it has been reported
    reportedPest.options.icon = null;
    
    this.reportedPests.push(reportedPest)
    

    console.log(`Manually added marker to ${position.lat}, ${position.lng}` )
   
 }

 Incidents: Array<Object> = [];
 incident: Incident
 position: google.maps.LatLngLiteral;
  getIncidents(): any {
    this.pestService.getIncidents().subscribe( async data => {
      const incidents = await data;

      for (let i=0; i < incidents.length; i++) {
        this.Incidents.push(incidents[i]);
        this.position = {lat: incidents[i].xcoord, lng: incidents[i].ycoord};
        
        console.log(`Added ${incidents[i].pestid} marker to ${this.position.lat}, ${this.position.lng}` )
          // TODO: Set icon based on pest type
        if (incidents[i].pestid == '55884984-3891-4c9c-b8d0-8526c65d5588') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'bobcat.png'
          this.reportedPests.push(reportedPest)
        }
        else if (incidents[i].pestid == 'b0b6c409-f67d-4646-be93-0bd4d1111ff4') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'ant.png'
          this.reportedPests.push(reportedPest)
        }
        else if (incidents[i].pestid == '1304fec9-e2ac-4f72-8e74-2450d1a03abb') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'rat.png'
          this.reportedPests.push(reportedPest)
        }
        else if (incidents[i].pestid == '7a532d09-6b6f-4050-a8a5-2b367441e31d') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'bee.png'
          this.reportedPests.push(reportedPest)
        }
        else if (incidents[i].pestid == 'a875fb40-3909-4610-a159-6e5bca823476') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'wasp.png'
          this.reportedPests.push(reportedPest)
        }
        else if (incidents[i].pestid == 'bd898a91-7b36-4442-8e41-479c5f951a20') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'cougar.png'
          this.reportedPests.push(reportedPest)
        }
        else {
          let reportedPest = new ReportedPest();
          console.log("Not setting marker icon")
          reportedPest.position = this.position;
          this.reportedPests.push(reportedPest);
        }

      }
      console.log(this.reportedPests)
    
    })
    
    return this.Incidents
  };
     


  getReportAndSetMarker(event: google.maps.MapMouseEvent) {
    console.log(`Getting report....`)
    this.addMarker(event) 
    this.dialogRef.open(PestReportComponent, {
      height: '33%',
      width: '33%'
    });

  }
  
  ngOnInit() {

    console.log(`Centering map on ${this.mapCenter.lat}, ${this.mapCenter.lng}`);
    let incidents = this.getIncidents();
    
  }


}
