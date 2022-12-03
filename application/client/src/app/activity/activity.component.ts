import { Component, OnInit } from '@angular/core';

import { Activity } from '../activity';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: Activity[] = [];
  activity!: Activity;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities(): Array<Activity> {
    this.activityService.getActivities()
    .subscribe(activities => this.activities = activities);

    console.log(this.activities)

    return this.activities

  }


//Finish CRUD operations
createActivity(at: string, rid: string, pt: string, sid: string, sub: string, pd: Text, rt: Text){
  this.activity.activitytype = at;
  this.activity.reportid = rid;
  this.activity.pesttype = pt;
  this.activity.submitterid = sid;
  this.activity.submitter = sub;
  this.activity.pestdescription = pd;
  this.activity.reporttext = rt;

  console.log(this.activity);
  this.activityService.createActivity(this.activity).subscribe(
  async data => {});
  alert("The Activity has been created");
  this.activity.activitytype = "";
  this.activity.reportid = "";
  this.activity.pesttype = "";
  this.activity.submitterid = "";
  this.activity.submitter = "";
  this.activity.pestdescription = null;
  this.activity.reporttext = null;
}
/*
createActivity(activity: Activity): Array<Activity> {
    this.activityService.createActivity(activity)

    console.log(this.activities)

    return this.activities
    
  }

  deleteActivity(activity: Activity): Array<Activity> {
    this.activityService.deleteActivity(activity)
    return this.activities
    
  }

  updateActivity(activity: Activity): Array<Activity> {
    this.activityService.updateActivity(activity)
    .subscribe(activityid => this.activity.activityid = activityid);

    console.log(this.activities)

    return this.activities
    
  }
  */

}
