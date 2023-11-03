import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { User } from '../models/user.class';
import { collection, getDocs } from "firebase/firestore";
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, documentId, setDoc } from '@firebase/firestore';
import { addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';



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
  puffer: any

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
      console.log('Recived changes from database', newusers)
      this.allUsers = newusers;
      console.log(this.allUsers[0]['zipCode'])
    })
  }

  openDialog() {
    this.dialog.open(DialogComponent)
  }

  
}
