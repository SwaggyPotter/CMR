import { Component, inject } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc } from '@firebase/firestore';
import { addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {
  user = new User()
  birthdate: any;
  title = 'CMR';
  firestore: Firestore = inject(Firestore)
  db: any
  loading: boolean = false;
  id = null;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {




    const firebaseConfig = {
      apiKey: "AIzaSyDxJcs5hA7ww_7W2MWnRmGbs13n5sn1_fA",
      authDomain: "simple-crm-system-9f5e8.firebaseapp.com",
      projectId: "simple-crm-system-9f5e8",
      storageBucket: "simple-crm-system-9f5e8.appspot.com",
      messagingSenderId: "988410038077",
      appId: "1:988410038077:web:ae12fc4879f67f2ceba754",
      measurementId: "G-J861YGKZ2C"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log(collection(this.firestore, 'users'))
  }

  async addUser() {
    this.loading = true;
    this.user.id = this.getRandomId().toString()
    let userAsJson = this.user.toJSON()
    //await addDoc(collection(this.firestore, 'users'), { userAsJson });
    await setDoc(doc(this.firestore, "users", this.user.id), userAsJson);
    this.loading = false;
    this.dialogRef.close();
  }



  getRandomId() {
    return Math.floor((Math.random() * 1254216205) + 2456457);
  }



  saveUser() {
    this.user.birthDate = this.birthdate.getTime()
    this.addUser()
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
