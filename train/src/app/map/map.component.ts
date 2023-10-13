import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import esriConfig from '@arcgis/core/config';


esriConfig.apiKey = 'AAPKec84156903554d5c90c16a258756c409ufWSfxC4kTATKmu1_S9ztNID9fYEU01za9yJ6ewxtZHDOV6XYeQNT1bzn9LTKY2N'; // Replace with your ArcGIS API key

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('mapViewNode', { static: true })
  private mapViewEl!: ElementRef;
  map: any;
  mapView: any; // Separate view for map

  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }
  
  initializeMap() {
    this.map = new Map({
      basemap: 'streets',
      ground: 'world-elevation'
    });

    this.mapView = new MapView({
      container: this.mapViewEl.nativeElement,
      map: this.map,
      center: [36, 33],
      zoom: 8
    });
    
  }
  
}
