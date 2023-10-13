import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { SceneComponent } from './scene/scene.component';
import { LayerComponent } from './layer/layer.component';
import { WidgetComponent } from './widget/widget.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    SceneComponent,
    LayerComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }