import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import SceneView from '@arcgis/core/views/SceneView';
import Scene from '@arcgis/core/WebScene';
import esriConfig from '@arcgis/core/config';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';


esriConfig.apiKey = 'AAPKec84156903554d5c90c16a258756c409ufWSfxC4kTATKmu1_S9ztNID9fYEU01za9yJ6ewxtZHDOV6XYeQNT1bzn9LTKY2N'; // Replace with your ArcGIS API key

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  @ViewChild('sceneViewNode', { static: true })
  private sceneViewEl!: ElementRef;
  scene: any;
  sceneView: any; // Separate view for scene

  constructor() { }

  ngOnInit(): void {
    this.initializeScene();
  }

  initializeScene() {

    this.scene = new Scene({
      basemap: 'topo-vector',
      ground: 'world-elevation'
    });

    this.sceneView = new SceneView({
      container: this.sceneViewEl.nativeElement,
      map: this.scene,
    });

    const graphicLayer = new GraphicsLayer({
      title: 'Graphic Layer',
    });
    this.scene.add(graphicLayer);
  

  }
}
