import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { User } from '../models/user.class';
import { collection } from "firebase/firestore";
import { Firestore, collectionData } from '@angular/fire/firestore';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})


export class UserComponent {
  user = new User()
  firestore: Firestore = inject(Firestore)
  users: any;
  db: any
  allUsers = [];


  constructor(public dialog: MatDialog) {
    const firebaseConfig = {
      apiKey: "AIzaSyDxJcs5hA7ww_7W2MWnRmGbs13n5sn1_fA",
      authDomain: "simple-crm-system-9f5e8.firebaseapp.com",
      projectId: "simple-crm-system-9f5e8",
      storageBucket: "simple-crm-system-9f5e8.appspot.com",
      messagingSenderId: "988410038077",
      appId: "1:988410038077:web:ae12fc4879f67f2ceba754",
      measurementId: "G-J861YGKZ2C"
    };
    const aCollection = collection(this.firestore, 'users')
    this.users = collectionData(aCollection);
    this.users.subscribe((newusers: any) => {
      this.allUsers = newusers;
    })
  }


  /**
   * Open the dialog for adding a new user
   */
  openDialog() {
    this.dialog.open(DialogComponent)
  }
}
