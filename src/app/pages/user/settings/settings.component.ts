import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  listTab: any = [
    { tabName: 'Change Password', tabRoute: 'change-password' },
  ];

  pageTitle: string = 'Settings';
  pageSubTitle: string = 'Change your profile settings.';

  profile = { displayPicture: null }
  
  constructor() { }

  ngOnInit(): void {
  }

}
