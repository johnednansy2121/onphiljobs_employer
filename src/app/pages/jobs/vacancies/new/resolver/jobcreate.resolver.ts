import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { JobsService } from 'src/app/services/jobs.service';

@Injectable({
  providedIn: 'root'
})
export class JobCreateResolver implements Resolve<any> {

  constructor(private jobSrv: JobsService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this.jobSrv.getAllClients()
      .then((data: any) => {
        return data
      })
      .catch(err => {
        console.log(err)
        this.toaster.error(err.error.Message);
        return this.router.navigateByUrl('/vacancies')
      })
  };
}
