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

}
