import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JWTTokenService } from 'src/app/services/jwttoken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(public fb: FormBuilder, private authenticationService: AuthenticationService,
    private router: Router,
    private jWTTokenService:JWTTokenService) {
    this.loginForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  public ngOnInit(): void {

  }

  validateLogin() {
    this.authenticationService.validateLogin(this.loginForm.controls.userName.value, this.loginForm.controls.password.value).subscribe((response)=>{
      this.jWTTokenService.setToken(response.token);
      this.authenticationService.loggedInUserDetail = response;
      this.authenticationService.isLoggedIn = true;
      this.authenticationService.userDetailsSubject.next(response);
      this.router.navigate(["/dashboard"])
    },(err)=>{
      
    });

  }

}
