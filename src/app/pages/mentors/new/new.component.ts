import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newmentor',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewMentorComponent implements OnInit {

  pageTitle: string;
  pageSubTitle: string;
  constructor() { }

  ngOnInit(): void {
    this.pageTitle = 'ADD RECRUITER';
    this.pageSubTitle = 'Add new recruiter that will help you recruit best people for the company';
  }

  itemsAsObjects = [{value: 0, display: 'Admin/Office Support'}, {value: 1, display: 'IT Support'},{value: 3, display: 'HR Associates'}];
  itemsAsObjects2 = [{value: 0, display: 'Talent Assessment and Acquisition'}, {value: 1, display: 'Candidate Sourcing and Screening'},{value: 3, display: 'High-volume Staffing'}];
}
