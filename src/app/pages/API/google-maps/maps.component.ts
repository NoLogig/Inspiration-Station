import {
    Component, ViewChild, ElementRef,
    OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy
} from '@angular/core';
import { } from "googlemaps";

@Component({
    selector: 'nlg-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy {

    @ViewChild('googleMaps', { static: true }) public googleMapsRef: ElementRef;

    coords: Coordinates;
    geolocation: Geolocation;
    googlemap: google.maps.Map;

    mapOptions: google.maps.MapOptions = {
        center: new google.maps.LatLng(35.2271, -80.8431),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    constructor() { }

    initGeolocation() {
        this.geolocation = navigator.geolocation;
    }

    locateSelf() {

        this.geolocation.getCurrentPosition(resp => {

            console.log('Latitude: %f \n Longitude %f \n', resp.coords.latitude, resp.coords.longitude);
            this.coords = resp.coords;
            this.googlemap.setCenter({ lat: this.coords.latitude, lng: this.coords.longitude });
        }, (error) => {

            console.log('Error get position', error);
        });

        /* let watchMe = this.geo.watchPosition();
        watchGMap.subscribe(resp => {
          // resp can be a set of coordinates, or an error (if occurre).
         console.log('Latitude: %f \n Longitude %f \n', resp.coords.latitude, resp.coords.longitude);
        }); */

        // Stop watching
        // watchGMap.unsubscribe();
    }

    /* ########################### */
    /* ####  Livecycle Hooks  #### */
    /* ########################### */

    ngOnInit(): void {
        console.log('Map Init google');

        try {

            this.googlemap = new google.maps.Map(this.googleMapsRef.nativeElement, this.mapOptions);
        } catch (error) {

            throw new Error(error);
        }
    }
    ngAfterViewChecked() { console.log('Map ViewChecked'); }
    ngAfterContentChecked() { console.log('Map ContentChecked'); }
    ngAfterContentInit() { console.log('Map ContentInit'); }
    ngAfterViewInit() { console.log('Map ViewInit'); }
    ngOnChanges() { console.log('Map Changes'); }
    ngOnDestroy() { console.log('Map Destroy'); }

}
