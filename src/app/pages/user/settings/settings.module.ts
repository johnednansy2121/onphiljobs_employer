import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';

const PROFILE_ROUTE = [
    
  {
      path: '',
      redirectTo: 'change-password',
      pathMatch: 'full'
  },
  {
      path: 'change-password',
      component: ChangePasswordComponent
  }
];

@NgModule({
  declarations: [SettingsComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    RouterModule.forChild(PROFILE_ROUTE)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
