import { Component } from '@angular/core';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user-detail-edit-dialog',
  templateUrl: './user-detail-edit-dialog.component.html',
  styleUrls: ['./user-detail-edit-dialog.component.scss']
})
export class UserDetailEditDialogComponent {
  user: any = User;
  loading : boolean = false;

  constructor(){

  }

  saveUser(){
    
  }
}
