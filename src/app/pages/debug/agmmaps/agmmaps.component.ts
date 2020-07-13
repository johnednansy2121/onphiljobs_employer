import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
import {} from "googlemaps"
@Component({
  selector: 'app-agmmaps',
  templateUrl: './agmmaps.component.html',
  styleUrls: ['./agmmaps.component.scss']
})
export class AgmmapsComponent implements OnInit {
  @ViewChild('search', {static: true})
  public searchElementRef: ElementRef;

  address: string;
  private geoCoder;

  markers = [

  ]
  // google maps zoom level
  zoom: number = 5;
  // initial center position for the map
  lat: number = -26.233449;
  lng: number = 133.848693;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
          console.log('test')

          this.markers = [];
          this.markers.push({
            lat: this.lat,
            lng: this.lng,
            draggable: true
          });
        });
      });
    });
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
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          this.toastr.error('No results found')
        }
      } else {
        this.toastr.error('No results found ' + status);
      }

    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    console.log("map clicked")
    console.log($event)
    if (this.markers.length > 0 ) {
      this.markers = [];
    } else {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
    }
  }
}

