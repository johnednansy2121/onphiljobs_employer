import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewProfileComponent implements OnInit {

  name = "John Doe";
  abbrev: string;

  constructor() { }

  ngOnInit(): void {
    this.abbrev = this.name.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'').substring(0,2);
  }

}
