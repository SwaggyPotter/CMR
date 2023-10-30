import { Component } from '@angular/core';
import { User } from '../models/user.class';

@Component({
  selector: 'app-edit-user-adress-dialog',
  templateUrl: './edit-user-adress-dialog.component.html',
  styleUrls: ['./edit-user-adress-dialog.component.scss']
})
export class EditUserAdressDialogComponent {
  user: any = User;
  loading : boolean = false;
  
  constructor() {

  }

  saveUser(){

  }
}
