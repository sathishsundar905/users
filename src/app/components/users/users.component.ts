import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersList:any = [];
  constructor(public authenticationService: AuthenticationService,private router:Router){
  
   }

   public ngOnInit(): void {
     this.authenticationService.getUsers().subscribe(params=>{
     this.usersList = params;
     },(err:any)=>{

     });
   }

   editUserDetail(editUserDetail:any){
     this.router.navigate(['/edit-user-details',editUserDetail._id])
   }

    deleteUser(userDetail: any) {
      this.authenticationService.deleteUser(userDetail).subscribe(params=>{
        this.ngOnInit();
        },(err:any)=>{
   
        });
    }

}
