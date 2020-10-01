import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProfileComponent implements OnInit {

  pageTitle: string = 'Edit Profile';
  pageSubTitle: string = 'Edit the profile of your company or organization.';
  constructor() { }

  ngOnInit(): void {
  }

}
