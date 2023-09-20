import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationFormGroup: FormGroup;
  userRoles = [{ label: "admin", value: "admin" }, { label: "tester", value: "tester" }, { label: "developer", value: "developer" }, { label: "manager", value: "manager" }]
  sex = [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }];
  errorMessage = "";
  isNewUser = true;
  pageTitle = "Register New User";
  editUserDetail: any;
  userId:any = "";
  constructor(public fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router,private route: ActivatedRoute) {
    this.registrationFormGroup = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      age: ["", Validators.required],
      sex: ["", Validators.required],
      userRole: ["", Validators.required],
      _id:[""],
      loginUserId:[""]
    });

    this.registrationFormGroup.valueChanges.subscribe((params) => {
      this.errorMessage = "";
    });



  }

  public ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
        this.getUserDetails();
        this.pageTitle = "Edit User Details";
        this.isNewUser = false;
      }
    }


  getUserDetails(){
    this.authenticationService.getUserDetail(this.userId).subscribe(params => {
      this.registrationFormGroup.patchValue({
        userName: params.userName,
        password: params.password,
        confirmPassword: params.password,
        age: params.age,
        sex: params.sex,
        userRole: params.userRole,
        _id: params._id,
        loginUserId: params.loginUserId,
      });
    }, (err: any) => {
      this.errorMessage = "User Already Exists";

    });
  }

  submitRegistration() {
    if (this.registrationFormGroup.valid) {
      if (this.registrationFormGroup.controls.password.value !== this.registrationFormGroup.controls.confirmPassword.value) {
        this.errorMessage = "Password and Confirm Password Doesnt match !!!!!";
        return;
      }

      if (this.isNewUser) {
        const request=  {...{},...this.registrationFormGroup.value};
        delete request._id;
        delete request.loginUserId;
        this.authenticationService.adduser(request).subscribe(params => {
          this.registrationFormGroup.reset();
        }, (err: any) => {
          this.errorMessage = "User Already Exists";

        });
      } else {
        this.authenticationService.updateUser(this.registrationFormGroup.value).subscribe(params => {
          this.router.navigate(["/users"]);
        }, (err: any) => {

        });
      }


    } else {
      this.errorMessage = "Please fill in all the fields";
    }
  }

}
