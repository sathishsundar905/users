import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { JWTTokenService } from './jwttoken.service';

@Injectable(
)
export class AuthGuardService {

  constructor(private authenticationService: AuthenticationService, private router: Router, private jWTTokenService: JWTTokenService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authenticationService.isLoggedIn) {
      this.authenticationService.logOut();
      return false;
    } else {
      if (!this.jWTTokenService.isTokenExpired()) {
        if (state.url === "/registration" || state.url === "/users" || state.url.indexOf("edit-user") > -1) {
          if (this.authenticationService.loggedInUserDetail.userRole === "admin") {
            return true;
          } else {
            this.router.navigate(["/unauthorized"]);
            return false;
          }

        } else {
          return true;

        }
      } else {
        this.router.navigate(["/home"]);
        return false;
      }

    }
  }
}
