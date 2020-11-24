import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';
import {} from "googlemaps"

@Component({
  selector: 'app-new',
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
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

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

  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  pageTitle: string = 'Add Job';
  pageSubTitle: string = 'create a job for you company or organization.';

  isMapClicked = true;
  showMap = true;
  salaryType = '';
  locationLatLang: any;
  mapMarkers = [];
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
  country: any;
  isWorkFromHome = false;
  state: any;
  city: any;
  stateItems: Array<any> = [];
  cityItems:Array<any> = [];
  enableState = false;
  enableCountry = false;
  constructor(private formBuilder: FormBuilder,
              private jobsService: JobsService,
              private spinnerSrv: SpinnerService,
              private router: Router,
              public sharedSrv: SharedService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.touchedRows = []
    this.initializeForm();
    this.clientsItem = this.jobsService.clientsItem;
    this.clients = this.jobsService.clients;
    console.log(this.clientsItem)
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

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

  initiateForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addRow() {
    const control = this.jobForm.get('section') as FormArray
    control.push(this.initiateForm())
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
      this.isMapClicked = true;
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
      this.getAddress($event.coords.lat, $event.coords.lng);
    }
  }

  initializeForm() {
    this.jobForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      section: this.formBuilder.array([]),
      details: this.formBuilder.group({
        isWorkFromHome:  [false],
        location: this.formBuilder.group({
          city:  [''],
          state:  [''],
          address1:  [''],
          address2:  [''],
          postalCode:  [''],
          lat: [0],
          long: [0],
          country: [''],
        }),
        salary: this.formBuilder.group({
          base: [''],
          upper: [''],
          currency: [''],
          type: [''],
        }),
        commitment: this.formBuilder.group({
          type: [''],
          duration: this.formBuilder.group({
            quantity: [1, Validators.required],
            unit: ['', Validators.required],
          })
        }),
        category: [null],
      }),
      premium: this.formBuilder.group({
        isFeatured: [true],
      }),
      status: ['DRAFT', Validators.required],
      //client: ['', Validators.required],
    });
    this.addRow()
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
  addJob() {
    //this.setClientId();
    this.spinnerSrv.show('Adding Vacancy');
    const jobData = this.jobForm.value;
    console.log(this.jobForm)
    this.jobsService.addJob(jobData).then( (res)=> {
      this.router.navigateByUrl('/vacancies')
    }).finally(()=> {
      //const clientId = this.clients.findIndex(x => x._id === this.jobForm.value.client)
      //this.jobForm.controls['client'].setValue(this.clients[clientId].name);
      this.spinnerSrv.hide();
    }).catch((err)=> {
      console.log(err);
    })
  }

  setClientId() {
    console.log(this.clients)
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
      this.jobForm.get('details.isWorkFromHome').patchValue(false);
    }
  }

}
