import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.scss']
})
export class UsercardComponent implements OnInit {
  @Input() public user: any;
  constructor() { }


  statsWidget = []

  ngOnInit(): void {

    this.statsWidget.push({
      title: 'Jobs',
      number: this.user.resume.experience,
      color: 'rgb(58, 131, 192)',
      icon: 'fa fa-briefcase'
    })

    this.statsWidget.push({
      title: 'Skills',
      number: this.user.resume.skills,
      color: '#FFAF40',
      icon: 'fa fa-check'
    })

    this.statsWidget.push({
      title: 'Education',
      number: this.user.resume.education,
      color: '#FF7940',
      icon: 'fa fa-graduation-cap'
    })

    this.statsWidget.push({
      title: 'Achievements',
      number: this.user.resume.achievements,
      color: '#32C68A',
      icon: 'fa fa-trophy'
    })


  }

}
