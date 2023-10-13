import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isWhite = true;
  showNavbar: boolean = false;
  @Output() toggleView: EventEmitter<void> = new EventEmitter<void>();

  onToggleView(): void {
    this.isWhite = !this.isWhite;
    this.toggleView.emit();
  }
}