import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { JobsService } from 'src/app/services/jobs.service';


@Injectable({
    providedIn: 'root'
})
export class HomeDataResolver implements Resolve<any>{

    constructor(
        private jobSrv : JobsService
    ) { }

    resolve() {
        return this.jobSrv.initialize().then(() => {
            this.jobSrv.getAllClients();
        })
            .catch(err => { return null })
    };

}
