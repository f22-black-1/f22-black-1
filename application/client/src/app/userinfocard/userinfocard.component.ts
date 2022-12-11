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
  public output: string;
  
  constructor(public userInfo: MatDialogRef<UserinfocardComponent>, @Inject(MAT_DIALOG_DATA) public selectedUser: CurrentUser,
  private uiService: UserinfoService) {
  // @Inject(MAT_DIALOG_DATA) public modalThread: string, private uiService: UserinfoService) {
    this.getUserInfo();
    this.getUserInfoByThread();
  }

  ngOnInit(): void {
  }

  openNewDiscussionThread(tid: string): void {
    console.log("selecting thread id: " + tid);
    // this.userInfo.close(tid);
    this.output = tid;

    this.userInfo.close(this.output);
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

  onClose(): void {
    this.userInfo.close(this.output);
  }

  onNoClick(): void {
    this.onClose();
  }
}
