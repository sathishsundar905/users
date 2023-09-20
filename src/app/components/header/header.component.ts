import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  userDetailSubscription =  new Subscription();
  userDetail:any;
  isAdminManager = false;
  
  constructor(public authenticationService: AuthenticationService){
   this.userDetailSubscription = this.authenticationService.userDetailsSubject.subscribe(params=>{
    this.userDetail = params;
    this.isAdminManager = this.userDetail.userRole === "admin" || this.userDetail.userRole === "manager";
   });
  }
  
  ngOnInit(): void {
   
    
  }

  logOut(){
    this.authenticationService.logOut();
  }
}
