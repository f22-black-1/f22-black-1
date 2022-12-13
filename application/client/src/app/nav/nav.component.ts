import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserInfo, UserInfoThread, UserAccountInfo } from '../userinfo';
import { CurrentUser } from '../login';
import { UserinfoService } from '../userinfo.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public activeUser: CurrentUser;
  public userList: UserAccountInfo[] = [];
  public listItem: UserAccountInfo;
  public userListSelection: UserAccountInfo;
  public user_name = new FormControl('');

  constructor(private breakpointObserver: BreakpointObserver, public uiService: UserinfoService,
    public router: Router) {
    this.activeUser = uiService.activeUser();
  }

  ngOnInit() {
    this.getUserList();
    this.user_name.setValue(this.activeUser.username);
    this.uiService.updateCurrentUser(this.activeUser.username);
  }

  signInUser(newUser: UserAccountInfo): void {
    let temp: CurrentUser = {
      userid: newUser.userid,
      username: newUser.username,
    }

    this.activeUser = temp;
    this.uiService.saveToLocalStorage(this.activeUser);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['../forum']);

    this.ngOnInit();
  }

  getUserList(): void {
    console.log("getting registered users");
    this.uiService.getRegisteredUsers().subscribe(data => this.userList = data);
  }

}
