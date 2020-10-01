import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  toogleValue: boolean = true;
  @Output() toggleChange = new EventEmitter<boolean>();

  toggled() {
    this.toogleValue === undefined
      ? (this.toogleValue = true)
      : (this.toogleValue = this.toogleValue);

    this.toogleValue = !this.toogleValue;
    this.toggleChange.emit(this.toogleValue);
  }
}
