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
import { Pest, PestMin, Incident, PestReport} from '../pest';


// See: https://github.com/angular/components/blob/main/src/google-maps/README.md


class ReportedPest {
  pesttype: string;
  position: google.maps.LatLngLiteral = null;
  options: google.maps.MarkerOptions = {icon: null};
}

class InProgressPest {
  pesttype: string;
  position: google.maps.LatLngLiteral = null;
  options: google.maps.MarkerOptions = {icon: null};
}


let InProgressPestList: InProgressPest[] = []




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



 PestReports: Array<Object> = [];
 position: google.maps.LatLngLiteral;
  getIncidents(): any {
    this.pestService.getPestReports().subscribe( async data => {
      const pestReports = await data;

      for (let i=0; i < pestReports.length; i++) {
        this.PestReports.push(pestReports[i]);
        this.position = {lat: pestReports[i].xcoord, lng: pestReports[i].ycoord};
        
        console.log(`Added ${pestReports[i].pestid} marker to ${this.position.lat}, ${this.position.lng}` )
          // TODO: Set icon based on pest type
        if (pestReports[i].pesttype == 'Feline') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'bobcat.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Ant') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'ant.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Rodent') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'rat.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Bee') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'bee.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Wasp') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'wasp.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Canine') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'cougar.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Snake') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'snake.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Plant') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'ivy.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Fox') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'fox.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Pig') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'pig.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Raccoon') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'raccoon.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Bear') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'bear.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Tick') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'tick.png'
          this.reportedPests.push(reportedPest)
        }
        else if (pestReports[i].pesttype == 'Caterpillar') {
          let reportedPest = new ReportedPest();
          reportedPest.position = this.position;
          reportedPest.options.icon = this.iconBase + 'caterpillar.png'
          this.reportedPests.push(reportedPest)
        }
        else {
          let reportedPest = new ReportedPest();
          console.log("Not setting marker icon")
          reportedPest.position = this.position;
          // reportedPest.options.icon = this.iconBase + 'wasp.png'
          this.reportedPests.push(reportedPest);
        }

      }
      console.log(this.reportedPests)
    
    })
    
    return this.PestReports
  };

  createPest(pest: PestMin): void {
    this.pestService.createPest(pest).subscribe( async data => {
      const pestReports = await data;
      location.reload() 
    })
    
  }

  addMarker(event: google.maps.MapMouseEvent) {
    let position = event.latLng!.toJSON()

    let reportedPest = new ReportedPest();
    reportedPest.position = position;

    // TODO: Don't let the marker be visible until after it has been reported   

    console.log(`Preparing to added marker to ${position.lat}, ${position.lng}` )

    return reportedPest;
   
 }

  pestMin : PestMin;
 
  inProgressPest = new InProgressPest()
     
  setPestTypeFromReport(pesttype: string): void {

    

    this.inProgressPest.position = InProgressPestList[0].position;
    this.inProgressPest.pesttype = pesttype;
    this.inProgressPest.options.icon = this.iconBase + 'caterpillar.png'
    
    console.log(this.inProgressPest)
    console.log(this.inProgressPest.pesttype);

    // Here we need to send the report to the Database and then call a ngOnInit()
    this.pestMin = {pesttype: this.inProgressPest.pesttype, 
                    xcoord: this.inProgressPest.position.lat, 
                    ycoord: this.inProgressPest.position.lng}

    console.log(this.pestMin);
    this.createPest(this.pestMin);
  }

  setPestPositionFromReport(position: google.maps.LatLngLiteral): void {
    console.log("Setting position from report")
    this.inProgressPest.position = position;
    console.log(this.inProgressPest);
    InProgressPestList.push(this.inProgressPest)
  }

  getReportAndReturnMarkerLocation(event: google.maps.MapMouseEvent) {
    console.log(`Getting report....`)
    let reportedPest = this.addMarker(event) 
    let position = reportedPest.position;
    this.dialogRef.open(PestReportComponent, {
      height: '33%',
      width: '33%'
    });

    console.log(position);

    this.setPestPositionFromReport(position);
  }
  
  ngOnInit() {

    console.log(`Centering map on ${this.mapCenter.lat}, ${this.mapCenter.lng}`);
    let incidents = this.getIncidents();
    
  }

  // applyPestTypeFilter(pType: string): void {
  //   this.ngOnInit(pType);
  // }

  //see pestOptionArray of filter componet for all of pest types
  pestTypeSelected: string = "ALL";
  
  onRadioButtonChanged(pestType: string){
    this.pestTypeSelected = pestType;
    console.log(this.pestTypeSelected + " forum onRadioButtonChanged")

    // if(this.pestTypeSelected === "ALL")
    // {
    //   this.ngOnInit();
    // }
    // else
    // {
    //   this.applyPestTypeFilter(this.pestTypeSelected);
    // }
  }


}
