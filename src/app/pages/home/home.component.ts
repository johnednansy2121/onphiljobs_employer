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

  contactsItems: any[] = [
    {
      name: 'Cathy Shelton',
      email: 'cathy.shelton31@example.com',
      img: '1.jpg'
    },
    {
      name: 'Marilyn Thomas',
      email: 'marilyn@example.com',
      img: '2.jpg'
    },
    {
      name: 'Dwight Gilbert',
      email: 'dwight@example.com',
      img: '3.jpg'
    },
    {
      name: 'Cody Moreno',
      email: 'moreno@example.com',
      img: '4.jpg'
    },
    {
      name: 'Jamie Freeman',
      email: 'freeman@example.com',
      img: '5.jpg'
    },
    {
      name: 'Charles Spencer',
      email: 'charles@example.com',
      img: '6.jpg'
    },
    {
      name: 'Vickie Reed',
      email: 'reed@example.com',
      img: '7.jpg'
    },
    {
      name: 'Lauren Ruiz',
      email: 'ruiz@example.com',
      img: '8.jpg'
    },
    {
      name: 'Marlene Vasquez',
      email: 'vasquez@example.com',
      img: '9.jpg'
    },
    {
      name: 'Loretta Morrisonz',
      email: 'morrisonz@example.com',
      img: '10.jpg'
    },
    {
      name: 'Yvonne Wood',
      email: 'wood@example.com',
      img: '11.jpg'
    },
    {
      name: 'Denise Franklin',
      email: 'franklin@example.com',
      img: '12.jpg'
    },
    {
      name: 'Joseph Gonzalez',
      email: 'gonzalez@example.com',
      img: '13.jpg'
    },
    {
      name: 'Rick Graham',
      email: 'graham@example.com',
      img: '14.jpg'
    },
    {
      name: 'Alexander Bailey',
      email: 'bailey@example.com',
      img: '15.jpg'
    },
    {
      name: 'Cathy Shelton',
      email: 'cathy.shelton31@example.com',
      img: '16.jpg'
    },
    {
      name: 'Stella Flores',
      email: 'stella@example.com',
      img: '1.jpg'
    },
    {
      name: 'Marilyn Thomas',
      email: 'marilyn@example.com',
      img: '2.jpg'
    },
    {
      name: 'Dwight Gilbert',
      email: 'dwight@example.com',
      img: '3.jpg'
    },
    {
      name: 'Cody Moreno',
      email: 'moreno@example.com',
      img: '4.jpg'
    },
    {
      name: 'Jamie Freeman',
      email: 'freeman@example.com',
      img: '5.jpg'
    },
    {
      name: 'Charles Spencer',
      email: 'charles@example.com',
      img: '6.jpg'
    },
    {
      name: 'Vickie Reed',
      email: 'reed@example.com',
      img: '7.jpg'
    },
    {
      name: 'Lauren Ruiz',
      email: 'ruiz@example.com',
      img: '8.jpg'
    },
    {
      name: 'Loretta Morrisonz',
      email: 'morrisonz@example.com',
      img: '9.jpg'
    },
    {
      name: 'Marlene Vasquez',
      email: 'vasquez@example.com',
      img: '10.jpg'
    },
    {
      name: 'Yvonne Wood',
      email: 'wood@example.com',
      img: '11.jpg'
    },
    {
      name: 'Denise Franklin',
      email: 'franklin@example.com',
      img: '12.jpg'
    }
  ];
  
  constructor(
    public jobSrv: JobsService,
  ) { }

  ngOnInit(): void {
    this.jobSrv.getAllClients();
    this.searchResults = this.jobSrv.jobItems;
  }

}
