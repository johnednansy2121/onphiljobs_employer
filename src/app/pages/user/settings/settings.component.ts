import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  env = environment;
  pageTitle: string = 'Settings';
  pageSubTitle: string = 'Change your profile settings';
  constructor() { }

  ngOnInit(): void {
  }

}
