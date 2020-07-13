import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JobModel } from "src/app/models/job.model";
import { SharedService } from 'src/app/services/shared.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';
import {} from "googlemaps"

@Component({
  selector: 'app-edit',
  animations: [
    trigger(
      'mapDisable',
      [
        transition(
        ':enter', [
          style({ opacity: 0}),
          animate('500ms', style({'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({'opacity': 1}),
          animate('500ms', style({'opacity': 0}))

        ]
      )]
    )
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;

  address: string;
  private geoCoder;

  markers = []
  // google maps zoom level
  zoom: number = 5;
  // initial center position for the map
  lat: number = -26.233449;
  lng: number = 133.848693;

  pageTitle: string = 'Edit Job';
  pageSubTitle: string = 'edit the job for you company or organization.';

  isMapClicked = true;
  showMap = true;
  stateItems: Array<any> = [];
  cityItems:Array<any> = [];
  jobModel: any;
  salaryType = '';
  job: any;
  _id: any;
  jobForm: FormGroup
  control: FormArray;
  touchedRows: any;
  clientsItem: Array<any> = [];
  clients: any;
  currentClient: any;
  salaryData: Array<any> = ['Fixed Salary','Range Salary','Hourly Fixed Salary'];
  categoryData: Array<any> = ['Oil & Gas' ,'IT', 'Accounting'];
  statusData: Array<any> = ['DRAFT', 'UNLISTED', 'PUBLISHED'];
  unitData: Array<any> = ['days', 'weeks', 'months', 'years'];
  commitmentTypeData: Array<any> = ['full-time', 'part-time', 'casual'];
  constructor(private formBuilder: FormBuilder, 
              private jobsService: JobsService, 
              private spinnerSrv: SpinnerService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              public sharedSrv: SharedService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private toastr: ToastrService) { }

  ngOnInit(): void {  
    if (this.activateRoute.snapshot.data.jobUpdateData) {
      this.jobModel = this.activateRoute.snapshot.data.jobUpdateData.Data;
      this._id = this.activateRoute.snapshot.params.id;
    } else {
      this.router.navigateByUrl('/vacancies')
    }
    this.touchedRows = []
    this.initializeForm();
    for (let index = 0; index < this.jobModel.section.length; index++) {
      const element = this.jobModel.section[index];
      this.addInitializedRow(element);
    }
    this.clientsItem = this.jobsService.clientsItem;
    this.clients = this.jobsService.clients;
    const clientId = this.clients.findIndex(x => x._id === this.jobModel.metadata.client);
    this.jobForm.controls['client'].setValue(this.clients[clientId].name);

    console.log(this.jobModel)
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      console.log('test')
      if (this.jobModel.details.isWorkFromHome) {
        this.jobForm.get('details.location').disable();
        this.showMap = false;
      } else {
        this.markers.push({
          lat: this.jobModel.details.location.lat,
          lng: this.jobModel.details.location.long,
          draggable: true
        });
        this.getAddress(this.jobModel.details.location.lat, this.jobModel.details.location.long)
      }
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();

          this.markers = [];
          this.markers.push({
            lat: this.lat,
            lng: this.lng,
            draggable: true
          });
        });
        
        this.isMapClicked = false;
        this.getAddress(this.lat, this.lng)
      });
    });
  }
  ngAfterOnInit() {
    this.control = this.jobForm.get('section') as FormArray
  }
  
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          console.log(results)
          const state = results[0].address_components.find(x => x.types[0] === "administrative_area_level_1");
          const country = results[0].address_components.find(x => x.types[0] === "country");
          const city = results[0].address_components.find(x => x.types[0] === "administrative_area_level_2");
          const postalCode = results[0].address_components.find(x => x.types[0] === "postal_code");
          const address2 = results.length > 1 ? results[1].formatted_address : '';
          this.jobForm.patchValue({
            details: {
              location: {
                country: country === undefined ? '' : country.long_name,
                city: city === undefined ? '' : city.long_name,
                state: state === undefined ? '' : state.long_name,
                postalCode: postalCode === undefined ? '' : postalCode.long_name,
                address1: results[0].formatted_address,
                address2: address2,
                lat: latitude,
                long: longitude
              }
            }
          })
          if (this.isMapClicked) {
            this.searchElementRef.nativeElement.value = results[0].formatted_address;
          }
          console.log(this.jobForm)
        } else {
          this.toastr.error('Location not found')
        }
      } else {
        this.toastr.error('Location not found');
      }

    });
  }

  mapClicked($event: MouseEvent) {
    this.searchElementRef.nativeElement.value = '';
    if (this.markers.length > 0 ) {
      this.isMapClicked = false;
      this.markers = [];
      this.jobForm.patchValue({
        details: {
          location: {
            city: '',
            state: '',
            lat: 0,
            lang: 0,
            address1: '',
            address2: '',
            postalCode: ''
          }
        }
      })
    } else {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
      
      this.isMapClicked = true;
      this.getAddress($event.coords.lat, $event.coords.lng);
    }
  }


  initiateForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  initiateSectionArray(section: any): FormGroup {
    return this.formBuilder.group({
      title: [section.title, Validators.required],
      description: [section.description, Validators.required]
    })
  }

  addInitializedRow(section: any) {
    const control = this.jobForm.get('section') as FormArray
    control.push(this.initiateSectionArray(section))
  }

  addRow() {
    const control = this.jobForm.get('section') as FormArray
    control.push(this.initiateForm())
  }

  initializeForm() {
    this.jobForm = this.formBuilder.group({
      _id: [this._id],
      title: [this.jobModel.title, Validators.required],
      subtitle: [this.jobModel.subtitle, Validators.required],
      section: this.formBuilder.array([]),
      details: this.formBuilder.group({
        isWorkFromHome:  [this.jobModel.details.isWorkFromHome],
        location: this.jobModel.details.location ? this.formBuilder.group({
          city:  [this.jobModel.details.location.city],
          state:  [this.jobModel.details.location.state],
          address1:  [this.jobModel.details.location.address1],
          address2:  [this.jobModel.details.location.address2],
          postalCode:  [this.jobModel.details.location.postalCode],
          lat: [this.jobModel.details.location.lat],
          long: [this.jobModel.details.location.long],
          country: [this.jobModel.details.location.country, Validators.required],
        }) : [''],
        salary: this.formBuilder.group({
          base: [this.jobModel.details.salary.base],
          upper:  [this.jobModel.details.salary.upper],
          currency:  [this.jobModel.details.salary.currency],
          type:  [this.jobModel.details.salary.type],
        }),
        commitment: this.formBuilder.group({
          type: [this.jobModel.details.commitment.type],
          duration: this.formBuilder.group({
            quantity: [this.jobModel.details.commitment.duration.quantity, Validators.required],
            unit: [this.jobModel.details.commitment.duration.unit, Validators.required],
          })
        }),
        category: [null],
      }),
      premium: this.formBuilder.group({
        isFeatured: [this.jobModel.premium.isFeatured],
      }),
      status: [this.jobModel.status, Validators.required],
      client: ['', Validators.required],
    });
  }
  get getFormControls() {
    const control = this.jobForm.get('section') as FormArray
    return control
  }

  deleteRow(index: number) {
    const control = this.jobForm.get('section') as FormArray
    control.removeAt(index)
  }
  get detailsControl() {
    const control = this.jobForm.get('details') as FormArray
    return control;
  }
  editJob() {
    this.setClientId();
    this.spinnerSrv.show('Saving Vacancy');
    const jobData = this.jobForm.value;
    console.log(jobData)
    this.jobsService.updateJob(jobData).then( (res)=> {
      console.log(res)
      this.router.navigateByUrl('/vacancies')
    }).finally(()=> {
      const clientId = this.clients.findIndex(x => x._id === this.jobForm.value.client)
      this.jobForm.controls['client'].setValue(this.clients[clientId].name);
      this.spinnerSrv.hide();
    }).catch((err)=> {
      console.log(err);
    })
  }

  setClientId() {
    if (this.jobForm.value.client !== '') {
      const clientId = this.clients.findIndex(x => x.name === this.jobForm.value.client)
      this.jobForm.controls['client'].setValue(this.clients[clientId]._id);
    }
  }

  setMap() {
    this.showMap = !this.showMap;
    if (!this.showMap) {
      this.markers = []
      this.searchElementRef.nativeElement.value = '';
      this.jobForm.get('details.isWorkFromHome').patchValue(true);
      this.jobForm.get('details.location').disable();
      console.log(this.jobForm)
    } else {
      this.jobForm.get('details.location').enable();
      this.jobForm.get('details.location').patchValue(this.formBuilder.group({
        city:  [''],
        state:  [''],
        address1:  [''],
        address2:  [''],
        postalCode:  [''],
        lat: [0],
        long: [0],
        country: [''],
      }))
      this.jobForm.get('details.isWorkFromHome').patchValue(false);
    }
  }
}
