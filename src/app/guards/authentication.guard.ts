import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { IResult } from '../models/IResult'
import { IProfile } from '../models/IProfile';
import { Store } from '@ngrx/store'
import { AppState } from '../app.state'
import * as ProfileActions from '../actions/profile.actions'

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(private profileService: ProfileService, private router: Router, private store: Store<AppState>) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return new Promise((resolve, reject) => {
            this.profileService.getProfile()
                .toPromise()
                .then((result: IResult<IProfile>) => {
                    if(result.Successful) {
                        this.store.dispatch(new ProfileActions.SetProfile(result.Data))
                        resolve(true)
                    } 
                })
                .catch(error => {
                    resolve(this.router.parseUrl("/auth/login"));
                })
        })
    }
}
