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
