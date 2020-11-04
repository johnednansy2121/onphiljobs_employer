import { Component, OnInit, TemplateRef } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  env = environment;
  loginForm: FormGroup;
  errorMessage = '';

  verificationCode = ''

  modalRef: BsModalRef

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinnerSrv: SpinnerService,
    private authSrv: AuthenticationService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }
  get formErrorHandler() { return this.f.password.errors || this.f.email.errors;  }
  get formStatusError() { return this.f.password.value === '' || this.f.email.value === '' }
  login() { 
    if (!this.formErrorHandler) {
      this.errorMessage = '';

      this.spinnerSrv.show('Signing you in...');
      console.log(this.f);
      this.authSrv.login(this.f.email.value, this.f.password.value)
        .then((result: any) => {
          //const { on2FA } = result.model
          // if(on2FA) {
          //   this.modalRef = this.modalSrv.show(template)
          // } else {
            console.log(result.model)
            this.authSrv.storeToken(result.model.token);
            this.router.navigateByUrl(environment.initial_page);
          //}
        })
        .catch(err => {
          console.log(err.error.message)
          this.toastr.error(err.error.message)
          this.spinnerSrv.hide();
        })
    }
  }


}
