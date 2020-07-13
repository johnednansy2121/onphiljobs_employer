import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { JobsService } from 'src/app/services/jobs.service';

@Injectable({
  providedIn: 'root'
})
export class JobUpdateResolver implements Resolve<any> {

  constructor(private jobSrv: JobsService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    this.jobSrv.clients
    console.log(route.params)
    return this.jobSrv.getJobById(route.params.id)
      .then((data: any) => {
        this.jobSrv.getAllClients();
        return data
      })
      .catch(err => {
        console.log(err)
        this.toaster.error(err.error.Message);
        return this.router.navigateByUrl('/vacancies')
      })
  };
}
