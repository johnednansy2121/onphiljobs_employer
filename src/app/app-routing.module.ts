import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/people/search/search.component';

import { AuthenticationGuard } from './guards/authentication.guard'
import { VacanciesComponent } from "./pages/jobs/vacancies/vacancies.component";
import { ViewComponent as VacanciesViewComponent } from "./pages/jobs/vacancies/view/view.component";
import { NewComponent as VacanciesNewComponent } from "./pages/jobs/vacancies/new/new.component";
import { MentorsDashboardComponent } from "./pages/mentors/dashboard/dashboard.component";
import { CommunicationsInboxComponent } from "./pages/communications/inbox/inbox.component";
import { EditComponent as EditComponent } from "./pages/jobs/vacancies/edit/edit.component";
import { JobsDataResolver } from './pages/jobs/vacancies/resolver/jobs.resolver'
import { JobUpdateResolver } from './pages/jobs/vacancies/edit/resolver/jobupdate.resolver'
import { JobUpdateClientResolver } from './pages/jobs/vacancies/edit/resolver/jobupdateclient.resolver'
import { JobCreateResolver } from './pages/jobs/vacancies/new/resolver/jobcreate.resolver'
import { JobViewResolver } from './pages/jobs/vacancies/view/resolver/jobview.resolver'
import { JobAppliedResolver } from './pages/jobs/vacancies/view/resolver/jobapplied.resolver'
import { JobConsideringResolver } from './pages/jobs/vacancies/view/resolver/jobconsidering.resolver'
import { JobShortlistResolver } from './pages/jobs/vacancies/view/resolver/jobshortlist.resolver'
import { JobWithdrawnResolver } from './pages/jobs/vacancies/view/resolver/jobwithdrawn.resolver'
import { JobDeclinedResolver } from "./pages/jobs/vacancies/view/resolver/jobdeclined.resolver";

import {AgmmapsComponent} from "./pages/debug/agmmaps/agmmaps.component";
import { ViewProfileComponent } from './pages/user/profile/view/view.component';
import { ViewMentorComponent } from './pages/mentors/view/view.component';
import { NewMentorComponent } from './pages/mentors/new/new.component';
import { EditMentorComponent } from './pages/mentors/edit/edit.component';
import { HomeDataResolver } from './pages/home/resolver/home.resolver';
import { EditProfileComponent } from './pages/user/profile/edit/edit.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SettingsComponent } from './pages/user/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [
      AuthenticationGuard
    ],
    children: [
      //home page and default route
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        resolve: { homeData: HomeDataResolver }
      },

      //people
      {
        path: 'people/search',
        component: SearchComponent
      },
      //vacancies
      {
        path: 'vacancies',
        component: VacanciesComponent,
        resolve: { jobsData: JobsDataResolver }
      },
      {
        path: 'vacancies/view/:id',
        component: VacanciesViewComponent,
        resolve: {  jobData: JobViewResolver,
                    jobAppliedData: JobAppliedResolver  ,
                    jobShortlistData: JobShortlistResolver  ,
                    jobConsideringData: JobConsideringResolver  ,
                    jobWithdrawnData: JobWithdrawnResolver,
                    jobDeclinedData: JobDeclinedResolver}
      },
      {
        path: 'vacancies/new',
        component: VacanciesNewComponent,
        resolve: { jobCreateData: JobCreateResolver }
      },
      {
        path: 'vacancies/edit/:id',
        component: EditComponent,
        resolve: { jobUpdateData: JobUpdateResolver,
                   jobUpdateClientData: JobUpdateClientResolver }
      },
      //mentors
      {
        path: 'mentors/dashboard',
        component: MentorsDashboardComponent
      },
      {
        path: 'mentors/view',
        component: ViewMentorComponent
      },
      {
        path: 'mentors/new',
        component: NewMentorComponent
      },
      {
        path: 'mentors/edit',
        component: EditMentorComponent
      },
      //communications
      {
        path: 'communications',
        component: CommunicationsInboxComponent
      },
      //user
      {
        path: 'user/profile/view',
        component: ViewProfileComponent
      },
      {
        path: 'user/profile/edit',
        component: EditProfileComponent
      },
      {
        path: 'user/settings',
        component: SettingsComponent
      },
      //tasks
      {
        path: 'tasks/view',
        component: TasksComponent
      },
      //debug stuff
      {
        path: 'debug/agmmaps',
        component: AgmmapsComponent
      }
    ]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'auth/forgot/changepassword',
    component: ChangepasswordComponent
  },
  {
    path: 'auth/forgot',
    component: ForgotpasswordComponent
  },
  {
    path: 'auth/verify/:verificationid',
    component: VerifyComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
