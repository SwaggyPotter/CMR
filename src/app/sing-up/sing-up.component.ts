import { Component } from '@angular/core';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent {
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }
}
