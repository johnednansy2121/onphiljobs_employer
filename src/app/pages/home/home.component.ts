import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageTitle: string = 'Welcome to Fllair Partners';
  pageSubTitle: string = 'Dashboard';

  constructor() { }

  ngOnInit(): void {
  }

}
