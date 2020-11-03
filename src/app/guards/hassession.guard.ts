import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";
import {SessionService} from "../services/session.service";

@Injectable({
  providedIn: 'root'
})
export class HasSessionGuard implements CanActivate {

  constructor(private sessionService: SessionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("hassession.guard:      Checking if session initialized")

      return new Promise((resolve, reject) => {
      this.sessionService.initializeSession()
          .then(result => {
              if(result){
                resolve(true)
              }
            // ADD TAYO DITO NG FAILED PAGE - DIFFERENT FROM 404 PAGE - I'LL HANDLE THIS ONE - Russell
              else{
              resolve(false)
            }
          })
          .catch(error => {
            // ADD TAYO DITO NG FAILED PAGE - DIFFERENT FROM 404 PAGE - I'LL HANDLE THIS ONE - Russell
            console.log(error)
            resolve(false);
          })
    })
  }

}
