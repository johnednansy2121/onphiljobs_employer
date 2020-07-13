import { Component, OnInit, TemplateRef } from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {Router, ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  env = environment;
  signupForm: FormGroup;
  twoFAForm: FormGroup;
  errorMessage = {
    type: '',
    message: ''
  };

  modalRef: BsModalRef
  isRequestProcess = 0;

  queryTag =  ''
  on2FA = false
  phone : any
  isVerified = false
  verificationCode = ''

  isValid2FAForm = true

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.Australia, CountryISO.UnitedKingdom];

  constructor(
    private service: SharedService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinnerSrv: SpinnerService,
    private modalSrv: BsModalService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params : any) => {
      this.queryTag = params.params.tag != undefined && params.params.tag != null ? params.params.tag : '' 
    })
    this.signupForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]]
    });
  }
  get f() { return this.signupForm.controls; }
  get formErrorHandler() {
    return (this.f.password.value !== this.f.confirm.value )
      || this.f.confirm.errors || this.f.password.errors
      || this.f.email.errors || this.f.userName.errors || this.checkWhiteSpace(this.signupForm.value.userName); }
  
  continue() {
    this.isRequestProcess = 1
  }
  
  checkCharacters(e) {
    this.signupForm.patchValue({
      userName: this.f.userName.value.replace(/[^A-Z0-9_.-]/ig, '')
    });
  }
  signUp() {
    this.spinnerSrv.show();
    if (!this.formErrorHandler) {
    this.spinnerSrv.show('Registering you now...');
    let internationalNumber = ''
    if(this.phone === undefined) {
      internationalNumber = ''
    } else {
      internationalNumber = this.phone.internationalNumber.replace(/\s/g,'')
    }
    setTimeout(() => {
      this.isRequestProcess = 2
      this.spinnerSrv.hide();
    }, 2000);  
  }
}
  public checkWhiteSpace(data) {
    return data.indexOf(' ') >= 0;
  }
  done() {
    this.isRequestProcess = 0;
    this.router.navigateByUrl('/auth/login');
  }

  public toggleOn2FA(isOn: boolean) {
    this.on2FA = isOn
    this.validate()
  }

  validate() {
    console.log(this.on2FA)
    console.log(this.phone)
    if(this.on2FA) {
      if(this.phone === undefined)
      {
        this.isValid2FAForm = false
      }
      else if(this.phone.internationalNumber === '')
        this.isValid2FAForm = false
      else
      {
        if(!this.isVerified)
          this.isValid2FAForm = false
        else 
          this.isValid2FAForm = true
      }
    } else {
      this.isValid2FAForm = true
    }
  }
}