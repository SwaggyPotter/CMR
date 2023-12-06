import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.scss']
})

export class MainSiteComponent {
  currentUser: any;

  constructor() {
    this.currentUser = localStorage.getItem('currentUser')
  }
}
