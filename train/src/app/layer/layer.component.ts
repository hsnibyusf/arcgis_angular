import { Component, Input, OnInit } from '@angular/core';
import esriConfig from '@arcgis/core/config';
import SceneLayer from '@arcgis/core/layers/SceneLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';

esriConfig.apiKey = 'AAPKec84156903554d5c90c16a258756c409ufWSfxC4kTATKmu1_S9ztNID9fYEU01za9yJ6ewxtZHDOV6XYeQNT1bzn9LTKY2N';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit {
  @Input() map: any; // Input property to receive the map object
  @Input() scene: any; // Input property to receive the scene object

  constructor() { }

  ngOnInit() {
    this.loadLayers();
  }

  async loadLayers() {
    try {


      const jordanlayer = new FeatureLayer({
        url: "https://services5.arcgis.com/v39TnO4upiocWRZJ/arcgis/rest/services/Bank_AllJordan/FeatureServer",
        title: "jordan layer",
      });

      const jordanatm = new FeatureLayer({
        url: "https://services5.arcgis.com/v39TnO4upiocWRZJ/ArcGIS/rest/services/Bank_AllJordan/FeatureServer/3",
        title: "jordanatm",
      });

      const jordanroads = new FeatureLayer({
        url: "https://services5.arcgis.com/v39TnO4upiocWRZJ/ArcGIS/rest/services/Bank_AllJordan/FeatureServer/4",
        title: "jordanroads",
      });

      const syrialayer = new FeatureLayer({
        url: "https://services7.arcgis.com/BqNufsTLUuq4e77p/arcgis/rest/services/Syria_Governorates_ADM1/FeatureServer",
        title: "syrialayer",
      });

      const cadstrelayer = new FeatureLayer({
        url: "https://services.arcgis.com/Djjoop3BmZekEtDo/ArcGIS/rest/services/Lebanon_Public_Schools_Cadastre/FeatureServer/1",
        title: "cadstrelayer",
      });

      const crimelayer = new FeatureLayer({
        portalItem: {
          id: "3807c58dd48c4d32810042d8edf4a2fe",
        },
        outFields: ["*"],
        title: "Chicago crime incidents",
      });

      const swisslayer = new SceneLayer({
        url: "https://tiles.arcgis.com/tiles/oPre3pOfRfefL8y0/arcgis/rest/services/swissbuildings3D/SceneServer",
        title: "swiss layer",
      });
      const elevationLayer = new ElevationLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/OsoLandslide/OsoLandslide_After_3DTerrain/ImageServer",
        visible: true
      });

      if (this.map) {
        this.map.layers.add(jordanlayer);
        this.map.layers.add(jordanatm);
        this.map.layers.add(jordanroads);
        this.map.layers.add(syrialayer);
        this.map.layers.add(crimelayer);
        this.map.layers.add(cadstrelayer);
      }

      if (this.scene) {
        
      
        this.scene.layers.add(crimelayer);
        this.scene.layers.add(jordanlayer);
        this.scene.layers.add(jordanatm);
        this.scene.layers.add(jordanroads);
        this.scene.layers.add(syrialayer);
        this.scene.layers.add(swisslayer);
        this.scene.ground.layers.add(elevationLayer);
      }
    } catch (error) {
      console.error('Error loading layers:', error);
    }
  }

  ngOnDestroy() {
    // Remove layers from the map before destroying the component
    if (this.map) {
      this.map.layers.removeAll();
    }

    // Remove layers from the scene before destroying the component
    if (this.scene) {
      this.scene.layers.removeAll();
    }
  }
}