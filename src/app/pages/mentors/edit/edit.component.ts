import { Component, OnInit } from '@angular/core';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditMentorComponent implements OnInit {

  pageTitle: string = 'Edit Recruiter';
  pageSubTitle: string = 'Update Recruiters details';
  fname: string;
  lname: string;
  constructor(private mservice: MentorService) { }

  ngOnInit(): void {
    this.fname = this.mservice.fname;
    this.lname = this.mservice.lname;

    console.log(this.fname);
  }

  itemsAsObjects = [{value: 0, display: 'Admin/Office Support'}, {value: 1, display: 'IT Support'},{value: 3, display: 'HR Associates'}];
  itemsAsObjects2 = [{value: 0, display: 'Talent Assessment and Acquisition'}, {value: 1, display: 'Candidate Sourcing and Screening'},{value: 3, display: 'High-volume Staffing'}];
}
