import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  env =environment;
  passworRecovery: FormGroup;
  isRequestDone: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private spinnerSrv: SpinnerService) {
  }

  ngOnInit() {
    this.passworRecovery = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  get f() { return this.passworRecovery.controls; }

  recoverPassword() {
    this.spinnerSrv.show('Sending your request...');
    setTimeout(() => {
      this.isRequestDone = true;
      this.spinnerSrv.hide();
    }, 2000);
  }

  done() {
    this.router.navigateByUrl('/auth/login');
  }
}
