import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { Router } from '@angular/router';
import { IProfile } from 'src/app/models/IProfile';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store'
import { AppState } from '../../../app.state'

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('toggleUserMenu', [
      state('void', style({
        height: '0',
        opacity: '0'
      })),
      state('true', style({
        height: '*',
        opacity: '1'
      })),
      transition(':enter', animate('200ms ease-in')),
      transition(':leave', animate('200ms ease-out'))
    ])
  ]
})
export class UserComponent implements OnInit {
  userMenu: boolean = false;

  profile: Observable<IProfile>

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { 
    this.profile = this.store.select('profile')
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/auth/login')
  }

  goToViewProfile(){
    this.router.navigate(['user/profile/view']);
  }
}
