import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
  env = environment;
  passworRecovery: FormGroup;
  emai: string;
  previousUrl: any;
  verified: boolean = false;
  notVerified: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.verified = true;
    }, 5000);
  }

  continue() {
    this.router.navigateByUrl("/home");
  }
}
