import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IResult } from '../models/IResult';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    
    private API_VERSION = 'api/v1'

    constructor(
        private httpClient: HttpClient,
        private toastSrv: ToastrService
        ) {}

    public login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.api_path + this.API_VERSION + '/user/login', {
                email,
                password
            }).toPromise()
            .then((result: IResult<string>) => {
                this.toastSrv.success(result.Message)
                localStorage.setItem('token', result.Data)
                resolve()
            })
            .catch(err => {
                this.toastSrv.error(err.error.Message)
                reject()
            })
        })
    }
}