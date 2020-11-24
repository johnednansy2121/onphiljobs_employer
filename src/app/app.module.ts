//Angular Core Libaries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop'

//3rd Party Libraries
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ImageCropperModule } from 'ngx-image-cropper'
import { NgxSocialShareModule } from 'ngx-social-share';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input'
import { TagInputModule } from 'ngx-chips';
import { AgmCoreModule } from '@agm/core';

import {environment} from "../environments/environment";

// Bootstrap imports
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TabsModule } from "ngx-bootstrap/tabs";

//Material imports
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from "@angular/material/slider";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatStepperModule } from "@angular/material/stepper";

// 3rd party libraries
import { QuillModule } from 'ngx-quill';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { LightboxModule } from 'ngx-lightbox';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContextMenuModule } from 'ngx-contextmenu';
import { MatTabsModule } from '@angular/material/tabs'

//Our Generations
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { LogoComponent } from './layout/header/logo/logo.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { NavigationTriggerComponent } from './layout/header/navigation-trigger/navigation-trigger.component';
import { UserComponent } from './layout/sidebar/user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { LeftpanelComponent } from './auth/includes/leftpanel/leftpanel.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/people/search/search.component';

import { DetailsComponent } from './pages/my/details/details/details.component';
import { EditDetailsComponent } from './pages/my/details/edit-details/edit-details.component';

//Utilities Modules/Component
import { SpinnerComponent } from './utilities/spinner/spinner.component';
import { QuickStatsModule } from './utilities/quick-stats/quick-stats.module';
import { SalesStatisticsModule } from './utilities/sales-statistics/sales-statistics.module';
import { GrowthRateModule } from './utilities/growth-rate/growth-rate.module';
import { UsercardComponent } from './pages/people/search/usercard/usercard.component';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { StoreModule } from '@ngrx/store'
import { reducer } from './reducer/profile.reducer'
import { HttpclientInterceptor } from './interceptors/httpclient.interceptors';
import { VacanciesComponent } from './pages/jobs/vacancies/vacancies.component';
import { NewComponent } from './pages/jobs/vacancies/new/new.component';
import { ViewComponent } from './pages/jobs/vacancies/view/view.component';
import { EditComponent } from './pages/jobs/vacancies/edit/edit.component';
import {MentorsDashboardComponent} from "./pages/mentors/dashboard/dashboard.component";
import { CommunicationsInboxComponent } from './pages/communications/inbox/inbox.component';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { AgmmapsComponent } from './pages/debug/agmmaps/agmmaps.component'
import { ViewProfileComponent } from './pages/user/profile/view/view.component';
import { ViewMentorComponent } from './pages/mentors/view/view.component';
import { NewMentorComponent } from './pages/mentors/new/new.component';
import { EditMentorComponent } from './pages/mentors/edit/edit.component';
import { EditProfileComponent } from './pages/user/profile/edit/edit.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SettingsModule } from './pages/user/settings/settings.module';
import { CreateComponent as CreateProfileComponent } from './pages/user/profile/create/create.component';

//profile
import { PrivateProfileComponentComponent } from './pages/profile/private-profile-component/private-profile-component.component';
import { DetailsPrivateProfileComponentComponent } from './pages/profile/components/details-private-profile-component/details-private-profile-component.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: environment.domain // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000',
    },
    button: {
      background: '#32c787'
    }
  },
  theme: 'classic',
  type: 'opt-out',
  position: "bottom-right"
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    SpinnerComponent,
    HeaderComponent,
    LogoComponent,
    PageLoaderComponent,
    NavigationTriggerComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    VerifyComponent,
    ChangepasswordComponent,
    LeftpanelComponent,
    HomeComponent,
    SearchComponent,
    UsercardComponent,
    VacanciesComponent,
    NewComponent,
    ViewComponent,
    EditComponent,
    MentorsDashboardComponent,
    CommunicationsInboxComponent,
    AgmmapsComponent,
    ViewProfileComponent,
    ViewMentorComponent,
    NewMentorComponent,
    EditMentorComponent,
    EditProfileComponent,
    TasksComponent,
    CreateProfileComponent,
    PrivateProfileComponentComponent,
    DetailsPrivateProfileComponentComponent,
    DetailsComponent,
    EditDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    QuickStatsModule,
    SalesStatisticsModule,
    GrowthRateModule,
    ReactiveFormsModule,
    ContextMenuModule.forRoot(),
    HttpClientModule,
    PerfectScrollbarModule,
    NgxSpinnerModule,
    TooltipModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatStepperModule,
    NgSelectModule,
    SelectDropDownModule,
    EcoFabSpeedDialModule,
    RoundProgressModule,
    TagInputModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDatepickerModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
        ]
      }
    }),
    ImageCropperModule,
    TypeaheadModule.forRoot(),
    LightboxModule,
    NgxSocialShareModule,
    CrystalLightboxModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    DragDropModule,
    TabsModule.forRoot(),
    NgxIntlTelInputModule,
    StoreModule.forRoot({
      profile: reducer
    }),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBX9oGSWibe9Wl0XFtT8KWUmx_ib84hp9A'
    }),
    SettingsModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }, {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpclientInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
