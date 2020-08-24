import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageTitle: string = 'Welcome Employers Name';
  pageSubTitle: string = 'Dashboard';
  searchResults = [];

  constructor(
    public jobSrv: JobsService,
  ) { }

  ngOnInit(): void {
    this.jobSrv.getAllClients();
    this.searchResults = this.jobSrv.jobItems;
  }

}
