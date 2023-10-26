import { Component } from '@angular/core';
import { User } from '../models/user.class';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  user = new User()
  birthdate: any;

  saveUser() {
    this.user.birthDate = this.birthdate.getTime()
    console.log('Current user is:', this.user)
  }
}
