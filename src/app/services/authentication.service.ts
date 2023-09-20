import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  availableUsers = [{
    userName: "sathish", password: "sathish", age: 30, sex: "Male", userRole: "admin",
  }, {
    userName: "john", password: "john", age: 30, sex: "Male", userRole: "tester",
  }];
  isLoggedIn = false;
  loggedInUserDetail:any;
  public userDetailsSubject = new BehaviorSubject({});
  public baseUrl = "http://localhost:3000/users"
  public baseUrlLogin = "http://localhost:3000/login/validate"
  constructor(private router: Router,private httpClient:HttpClient) { }

  validateLogin(userName: String, password: String):Observable<any> {
    return this.httpClient.post(this.baseUrlLogin,{userName:userName,password:password});
  }

  getUsers():Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }


  getUserDetail(id:any):Observable<any> {
    return this.httpClient.get(this.baseUrl+"/"+id);
  }

  adduser(userDetails: any) {
    return this.httpClient.post(this.baseUrl,userDetails);
  }


  updateUser(userDetails: any) {
    const request = {...{},...userDetails};
    delete request._id;
    return this.httpClient.put(this.baseUrl+"/"+userDetails._id,request);
  }

  deleteUser(userDetails: any) {
    return this.httpClient.delete(this.baseUrl+"/"+userDetails._id,userDetails);
  }

  logOut() {
    this.loggedInUserDetail = {};
    this.userDetailsSubject.next({});
    this.isLoggedIn = false;
    this.router.navigate(["/home"]);
  }
}
