import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  userDetails:any;
  constructor(private authenticationService:AuthenticationService) {

  }

  getUserDetails(){
    this.authenticationService.getUserDetail(this.authenticationService.loggedInUserDetail._id).subscribe(params => {
     this.userDetails = params
    }, (err: any) => {
    });
  }

  public ngOnInit(): void {
    this.getUserDetails();
  }
}
