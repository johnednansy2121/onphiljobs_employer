import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    
    private API_VERSION = 'api/v1'

    constructor(private httpClient: HttpClient) {}

    public getProfile() {
        return this.httpClient.get(environment.api_path + this.API_VERSION + '/profile')
    }
}