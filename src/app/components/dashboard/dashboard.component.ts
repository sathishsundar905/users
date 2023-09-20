import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  userDetail:any;
  constructor(private authenticationService:AuthenticationService){

  }


  public ngOnInit(): void {
    this.userDetail = this.authenticationService.loggedInUserDetail;
  }
}
