import { Component, OnInit, Inject } from '@angular/core';
import { CurrentUser } from '../login';
import { UserInfo, UserInfoThread } from '../userinfo';
import { UserinfoService } from '../userinfo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-userinfocard',
  templateUrl: './userinfocard.component.html',
  styleUrls: ['./userinfocard.component.css']
})
export class UserinfocardComponent implements OnInit {

  public currentUserInfo: UserInfo;
  public uiThreadList: UserInfoThread[] = [];
  public uiThread: UserInfoThread;
  
  constructor(public userInfo: MatDialogRef<UserinfocardComponent>, @Inject(MAT_DIALOG_DATA) public selectedUser: CurrentUser,
  @Inject(MAT_DIALOG_DATA) public modalThread: string, private uiService: UserinfoService) {
    this.getUserInfo();
    this.getUserInfoByThread();
  }

  ngOnInit(): void {
  }

  openNewDiscussionThread(tid: string): void {
    this.modalThread = tid;
    this.userInfo.close();
  }

  getUserInfoByThread(): void {
    console.log("getting thread level data for: " + this.selectedUser.username);
    this.uiService.getUserMessageActivity(this.selectedUser).subscribe(data => this.uiThreadList = data);
  }

  getUserInfo(): void {
    console.log("getting data for: " + this.selectedUser.username);
    this.uiService.getUserInfo(this.selectedUser).subscribe(data => this.currentUserInfo = data);
  }

  addNumbers(num1: number, num2: number): number {
    var numSum = Number(Number(num1) + Number(num2));
    return numSum;
  }

  qualityScore(num1: number, num2: number): string {
    var numSum = Number(Number(num1) + Number(num2));

    if(numSum == 0 || numSum == null)
    {
      return "--";
    }

    var percent = Math.round((num1 / Number(numSum)) * 100);

    return percent + "%";
  }

  onNoClick(): void {
    this.userInfo.close();
  }
}
