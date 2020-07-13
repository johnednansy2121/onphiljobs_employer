  import { Component, OnInit, TemplateRef } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { JobModel } from "src/app/models/job.model";
  import { DomSanitizer } from '@angular/platform-browser';
  import { JobsService } from 'src/app/services/jobs.service';
  import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
  import { ToastrService } from 'ngx-toastr';
  import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
  import { environment } from '../../../../../environments/environment';
  import { MapsAPILoader } from '@agm/core';


  @Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
  })
  export class ViewComponent implements OnInit {
    
    env = environment;
    pageTitle: string = 'View Vacancy';
    pageSubTitle: string = 'See and manage this vacancies applicants.';

    domain: any;
    link: any;
    setLocationMap = true;
    markers = []
    // google maps zoom level
    zoom: number = 5;
    // initial center position for the map
    lat: number = -26.233449;
    lng: number = 133.848693;
    jobApplicants = []
    jobApplied = []
    jobConsidering =[]
    jobShortList = []
    jobWithdrawn = []
    jobDeclined = []
    open = false;
    modalRef: BsModalRef;
    statusUpdate = '';
    isDropup = true;
    _id: any;
    job: JobModel;
    constructor(
      private activateRoute: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService,
      private modalService: BsModalService,
      private sanitizer: DomSanitizer,
      private spinnerSrv: SpinnerService,
      private jobSrv: JobsService,
      private mapsAPILoader: MapsAPILoader,) { }

    ngOnInit(): void {
      if (this.activateRoute.snapshot.data.jobData || this.activateRoute.snapshot.data.jobApplicantsData ||
        this.activateRoute.snapshot.data.jobAppliedData || this.activateRoute.snapshot.data.jobShortlistData ||
        this.activateRoute.snapshot.data.jobConsideringData || this.activateRoute.snapshot.data.jobWithdrawnData) {

        this.jobApplicants = this.activateRoute.snapshot.data.jobApplicantsData
        this.jobApplied = this.activateRoute.snapshot.data.jobAppliedData
        this.jobShortList = this.activateRoute.snapshot.data.jobShortlistData
        this.jobConsidering = this.activateRoute.snapshot.data.jobConsideringData
        this.jobWithdrawn = this.activateRoute.snapshot.data.jobWithdrawnData
        this.jobDeclined = this.activateRoute.snapshot.data.jobDeclinedData
        this.job = this.activateRoute.snapshot.data.jobData;
        this._id = this.activateRoute.snapshot.params.id;
        console.log(this.job)
      } else {
        this.router.navigateByUrl('/vacancies')
      }

      if (!this.job.details.isWorkFromHome) {
        this.mapsAPILoader.load().then(() => {
          this.lat = this.job.details.location.lat;
          this.lng = this.job.details.location.long;
          this.markers.push({
            lat: this.job.details.location.lat,
            lng:  this.job.details.location.long,
            draggable: false
          });
        });
      }
    }
    convertToHTML(data) {
      return this.sanitizer.bypassSecurityTrustHtml(data);
    }

    updateJobStatus() {
      const id = {
        id: this._id
      }
      switch (this.statusUpdate) {
        case 'publish':
            if (this.job.status === 'PUBLISHED') {
              this.toastr.error('Job is already published');
            } else {
              this.spinnerSrv.show('Publishing Job');
              this.jobSrv.publishJob(id).then((res) => {
                this.job.status = 'PUBLISHED';
                this.router.navigateByUrl('/vacancies')
              })
            }
          break;
        case 'draft':
            if (this.job.status === 'DRAFT') {
              this.toastr.error('Job is already drafted');
            } else {
              this.spinnerSrv.show('Drafting Job');
              this.jobSrv.draftJob(id).then((res) => {
                this.job.status =  'DRAFT';
                this.router.navigateByUrl('/vacancies')
              })
            }
          break;
        case 'unlist':
            if (this.job.status === 'UNLISTED') {
              this.toastr.error('Job is already unlisted');
            } else {
              this.spinnerSrv.show('Unlisting Job');
              this.jobSrv.unlistJob(id).then((res) => {
                this.job.status = 'UNLISTED';
                this.router.navigateByUrl('/vacancies')
              })
            }
          break;
        default:
          break;
      }
      this.modalRef.hide()
    }

    openModal(template: TemplateRef<any>, status) {
      this.modalRef = this.modalService.show(template);
      this.statusUpdate = status;
    }

    setAsShortListed(_id: any, index: any, applicant: any, origin: any) {
      this.spinnerSrv.show('Marking application as short-listed.')
      this.jobSrv.shortlistApplicant(_id).then((res) => {
        const lastStatus = applicant.status
        applicant.status = 'SHORTLIST';
        this.jobShortList.push(applicant);
        const _applicantId = this.jobApplicants.findIndex(x => x._id === applicant._id);
        this.jobApplicants[_applicantId].status = 'SHORTLIST';
        if(origin !== 'all applicants') {
          origin.splice(index, 1);
        } else {
          switch (lastStatus) {
            case 'SHORTLIST': 
                this.jobShortList.splice(index, 1);
            break;
            case 'CONSIDERING': 
                this.jobConsidering.splice(index, 1);
            break;
            case 'DECLINED': 
                this.jobWithdrawn.splice(index, 1);
            break;
            default:
            break;
          }
        }
      }).finally(() =>
      this.spinnerSrv.hide())
    }

    setAsDeclined(_id: any, index: any, applicant: any, origin: any) {
      this.spinnerSrv.show('Marking application as declined.')
      this.jobSrv.declineApplicant(_id).then((res) => {
        const lastStatus = applicant.status
        applicant.status = 'DECLINED';
        this.jobDeclined.push(applicant);
        const _applicantId = this.jobApplicants.findIndex(x => x._id === applicant._id);
        this.jobApplicants[_applicantId].status = 'DECLINED';
        if(origin !== 'all applicants') {
          origin.splice(index, 1);
        } else {
          switch (lastStatus) {
            case 'SHORTLIST': 
                this.jobShortList.splice(index, 1);
            break;
            case 'CONSIDERING': 
                this.jobConsidering.splice(index, 1);
            break;
            case 'DECLINED': 
                this.jobDeclined.splice(index, 1);
            break;
            default:
            break;
          }
        }
      }).finally(() =>
      this.spinnerSrv.hide())
    }

    setAsConsidered(_id: any, index: any, applicant: any, origin: any) {
      this.spinnerSrv.show('Marking application as considered.')
      this.jobSrv.considerApplicant(_id).then((res) => {
        const lastStatus = applicant.status
        applicant.status = 'CONSIDERING';
        this.jobConsidering.push(applicant);
        const _applicantId = this.jobApplicants.findIndex(x => x._id === applicant._id);
        this.jobApplicants[_applicantId].status = 'CONSIDERING';
        if(origin !== 'all applicants') {
          origin.splice(index, 1);
        } else {
          switch (lastStatus) {
            case 'SHORTLIST': 
                this.jobShortList.splice(index, 1);
            break;
            case 'CONSIDERING': 
                this.jobConsidering.splice(index, 1);
            break;
            case 'DECLINED': 
                this.jobWithdrawn.splice(index, 1);
            break;
            default:
            break;
          }
        }
      }).finally(() =>
      this.spinnerSrv.hide())
    }

    checkSameAddress() {
      return this.job.details.location.address2 && this.job.details.location.address1 !== this.job.details.location.address2;
    }

    openPublicProfile(username: string) {
      if (this.env.name === 'Production') {
        this.link = "https://www.fllair.com/u/" +username;
      } else {
        this.link = "https://dev.fllair.com/u/" +username;
      }
      window.open(this.link)
    }
  }
