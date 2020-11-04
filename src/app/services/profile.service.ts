import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions'

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    
    private API_VERSION = 'api/v1/';
    public isInitialized = false;
    detailsForm: FormGroup;
    profileImage = '';
    public profile = { premium: {
            hasProSubscription: false
        }
    }

    constructor(private httpClient: HttpClient, private toastSrv: ToastrService, private store: Store<AppState>){}
    public initialize() {
        if (this.isInitialized) {
            return Promise.resolve(this.detailsForm);
        } else {
            return this.getProfileForDetails().then(
                (data: any) => {
                    console.log(data);
                    const user = { ...data.model }
                    this.mapGroup(user);
                    this.profile = data.model;
                    this.profileImage = user.displayPicture;
                }
            ).catch(err => { return err })
        }
    }

    public createProfile(data: any, _displayPicture) {
        console.log(data.value.jobTitle);
        return this.httpClient.post(environment.api_path + this.API_VERSION + 'employer-profile', {
            firstName: data.value.firstName,
            lastName: data.value.lastName,
            aboutMe: data.value.aboutMe,
            displayPicture: _displayPicture,
            jobTitle: data.value.jobTitle,
            videoUrl: data.value.videoUrl,
            socialLinks: {
                facebook: data.value.facebook,
                twitter: data.value.twitter,
                linkedin: data.value.linkedin,
                instagram: data.value.instagram
            },
            location: {
                state: data.value.state,
                country: data.value.country,
            }
        });
    }
    
    mapGroup(user) {
        this.detailsForm = new FormGroup({
            '_id': new FormControl(user._id),
            'firstName': new FormControl(user.firstName),
            'lastName': new FormControl(user.lastName),
            'aboutMe': new FormControl(user.aboutMe),
            'displayPicture': new FormControl(user.displayPicture),
            'socialLinks': new FormGroup({
                'linkedin': new FormControl(user.socialLinks.linkedin),
                'facebook': new FormControl(user.socialLinks.facebook),
                'twitter': new FormControl(user.socialLinks.twitter),
                'instagram': new FormControl(user.socialLinks.instagram),
            }),
            'videoUrl': new FormControl(user.videoUrl == '' ? '' : 'https://youtu.be/' + user.videoUrl),
            'jobTitle': new FormControl(user.jobTitle),
            'location': new FormGroup({
                'state': new FormControl(user.location.state),
                'country': new FormControl(user.location.country)
            })
        });
    }

    public getProfile() {
        console.log("getProfile");
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'employer-profile')
    }

    public getProfileForDetails() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + 'employer-profile').toPromise();
    }
}