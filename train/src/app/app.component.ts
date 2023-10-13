import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMapVisible = true;
  title: any;

  toggleView(): void {
    this.isMapVisible = !this.isMapVisible;
  }
}