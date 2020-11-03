import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { AppState } from '../app.state'
import { Store } from '@ngrx/store'
import * as ProfileActions from '../actions/profile.actions'

@Injectable({
    providedIn: 'root'
})
export class HasProfileGuard implements CanActivate {

    constructor(private profileService : ProfileService, private router: Router, private store: Store<AppState>) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log("hasprofile.guard:      Checking If User Has Profile")

        return new Promise((resolve, reject) => {
            this.profileService.getProfile()
                .toPromise()
                .then((result: any) => {
                    const { successful } = result
                    if(successful){
                        this.store.dispatch(new ProfileActions.SetProfile(result.model))
                        resolve(true)
                    }
                    else
                    resolve(this.router.parseUrl('/user/profile/create')) // ITO MAIN ISSUE - Fixed, don't just copy paste items make sure to know it also, if not debug them until you know it.
                })
                .catch(err => {
                    resolve(this.router.parseUrl('/auth/login'))
                })
        })
    }
}
