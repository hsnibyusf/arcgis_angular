import { Component, Input, OnInit } from '@angular/core';
import Search from '@arcgis/core/widgets/Search';
import Legend from '@arcgis/core/widgets/Legend';
import esriConfig from '@arcgis/core/config';
import Expand from '@arcgis/core/widgets/Expand';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import LayerList from '@arcgis/core/widgets/LayerList';
import Directions from '@arcgis/core/widgets/Directions';
import RouteLayer from '@arcgis/core/layers/RouteLayer';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion';
import Home from '@arcgis/core/widgets/Home';
import Editor from '@arcgis/core/widgets/Editor';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import  BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import  Track from '@arcgis/core/widgets/Track';
import Daylight from '@arcgis/core/widgets/Daylight';
import ElevationProfile from '@arcgis/core/widgets/ElevationProfile';
import Weather from '@arcgis/core/widgets/Weather';

esriConfig.apiKey = 'AAPKec84156903554d5c90c16a258756c409ufWSfxC4kTATKmu1_S9ztNID9fYEU01za9yJ6ewxtZHDOV6XYeQNT1bzn9LTKY2N';

@Component({
  selector: 'app-widget',
  template: '',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  @Input() mapView: any;
  @Input() sceneView: any;
  expandedWidget: Expand | null = null;
  sketchLayer!: GraphicsLayer;

  constructor() {}

  ngOnInit() {
    this.sketchLayer = new GraphicsLayer();
    this.addWidgets();
  }

  addWidgetsToView(view: any) {
    
    if (view) {
      const routeLayer = new RouteLayer({ title: 'route Layer' });
      view.map.add(routeLayer);
      const searchWidget = new Search({ view: view });
      view.ui.add(searchWidget, 'top-right');

      const home = new Home({ view: view });

      const basemapGallery = new BasemapGallery({ view: view });
      const bgExpand = new Expand({
        view: view,
        content: basemapGallery
      });

      const layerList = new LayerList({
        view: view,
        listItemCreatedFunction: function(event: any) {
          const item = event.item;
          if (item.layer.type !== 'group' && item.layer.title) {
            item.actionsSections = [[{
              title: 'Zoom to Layer',
              id: 'zoom-to-layer',
              className: 'esri-icon-zoom-in-magnifying-glass'
            }]];
          }
        }
      });

      layerList.on('trigger-action', function(event: any) {
        if (event.action.id === 'zoom-to-layer') {
          const selectedLayer = event.item.layer;
      
          console.log('Selected Layer:', selectedLayer);
      
          if (selectedLayer.type === "feature") {
            if (selectedLayer.queryExtent) {
              selectedLayer.queryExtent().then((response:any) => {
                const layerExtent = response.extent;
                if (layerExtent) {
                  view.goTo(layerExtent).catch((error:any) => {
                    console.error("Error zooming to layer extent:", error);
                  });
                } else {
                  console.warn("Layer extent is not available.");
                }
              }).catch((error:any) => {
                console.error("Error querying layer extent:", error);
              });
            } else {
              console.warn("queryExtent method is not available on the selected layer.");
            }
          } else {
            console.warn("Selected layer is not a feature layer.");
          }}
      });

      const LLExpand = new Expand({
        view: view,
        content: layerList
      });

      const direction = new Directions({
        view: view,
        layer: routeLayer,
        apiKey: esriConfig.apiKey
      });
      const directionexpand = new Expand({
        view: view,
        content: direction
      });
      const track = new Track({
        view: view,
      });
    

      const legend = new Legend({ view: view });
      const LegendExpand = new Expand({
        view: view,
        content: legend
      });

      const cc = new CoordinateConversion({ view: view });

      const editor = new Editor({ view: view });
      const editorExpand = new Expand({
        
        content: editor
      });

      const sketch = new Sketch({
        view: view,
        layer: this.sketchLayer
      });
      const sketchexpand = new Expand({
        view: view,
        content: sketch
      });
      const basmaptoggle =new BasemapToggle({
        view: view,
      })
      view.ui.add(track, 'top-right');
      view.ui.add(basmaptoggle, 'bottom-right');
      view.ui.add(basmaptoggle, 'bottom-right');
      view.ui.add(home, 'top-left');
      view.ui.add(editorExpand, 'top-left');
      view.ui.add(bgExpand, 'top-left');
      view.ui.add(LegendExpand, 'top-right');
      view.ui.add(LLExpand, 'top-right');
      view.ui.add(sketchexpand, 'top-right');
      view.ui.add(directionexpand, 'top-left');
      view.ui.add(cc, 'bottom-right');

    
      direction.on('directions-finish', (event) => {
        this.showDirectionPath(view, event);
      });

      

      bgExpand.watch('expanded', (expanded) => {
        this.handleWidgetExpand(expanded, bgExpand);
      });

      LegendExpand.watch('expanded', (expanded) => {
        this.handleWidgetExpand(expanded, LegendExpand);
      });

      LLExpand.watch('expanded', (expanded) => {
        this.handleWidgetExpand(expanded, LLExpand);
      });

      sketchexpand.watch('expanded', (expanded) => {
        this.handleWidgetExpand(expanded, sketchexpand);
      });

      directionexpand.watch('expanded', (expanded) => {
        this.handleWidgetExpand(expanded, directionexpand);
      });

      editorExpand.watch('expanded', (expanded) => {
        this.handleWidgetExpand(expanded, editorExpand);
      });


      if (view.type === "3d") {

        const elevationProfile = new ElevationProfile({ view: view });
        const elevationexpand = new Expand({
          view: view,
          content: elevationProfile
        });
        view.ui.add(elevationexpand, 'top-right');




        const weather = new Weather({ view: view });
        const weatherExpand = new Expand({
          content: weather
        });
        view.ui.add(weatherExpand, 'top-right');
  
       
  
        const daylight = new Daylight({ view: view });
        const Daylightexpand = new Expand({
          view: view,
          content: daylight
        });
        view.ui.add(Daylightexpand, 'top-right');


        elevationexpand.watch('expanded', (expanded) => {
          this.handleWidgetExpand(expanded, elevationexpand);
        });
  
        weatherExpand.watch('expanded', (expanded) => {
          this.handleWidgetExpand(expanded, weatherExpand);
        });
  
        Daylightexpand.watch('expanded', (expanded) => {
          this.handleWidgetExpand(expanded, Daylightexpand);
        });
  


      }
    }
  }
    

  handleWidgetExpand(expanded: boolean, widget: Expand) {
    if (expanded && this.expandedWidget !== widget) {
      if (this.expandedWidget) {
        this.expandedWidget.collapse();
      }
      this.expandedWidget = widget;
    } else if (!expanded && this.expandedWidget === widget) {
      this.expandedWidget = null;
    }
  }

  addWidgets() {
    this.addWidgetsToView(this.mapView);
    this.addWidgetsToView(this.sceneView);
  }

  
  showDirectionPath(view: any, event: any) {
    const routeGraphic = event.result.routeResults[0].route;
    const graphicsLayer = view.map.layers.find(
      (layer: any) => layer.title === 'route Layer'
    );
    graphicsLayer.removeAll();
    graphicsLayer.add(routeGraphic);
  }
}
 