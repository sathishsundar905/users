import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

    public jwtToken = "";
    public decodedToken: any;

    constructor() {
    }

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
      }
    }

    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }


    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }

    isTokenExpired(): boolean {
      const expiryTime: number = this.getExpiryTime();
      if (expiryTime) {
        console.log(((1000 * expiryTime) - (new Date()).getTime()) < 5000);
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}