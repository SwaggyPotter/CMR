import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { User } from '../models/user.class';

@Component({
  selector: 'app-edit-user-adress-dialog',
  templateUrl: './edit-user-adress-dialog.component.html',
  styleUrls: ['./edit-user-adress-dialog.component.scss']
})
export class EditUserAdressDialogComponent {
  user: any = User;
  loading: boolean = false;
  db: any
  firestore: Firestore = inject(Firestore)


  constructor() {
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
    this.db = getFirestore(app);

  }

  async updateUser() {
    const db = getDatabase();
    this.loading = true;
    let userAsJson = this.user.toJSON()
    //await addDoc(collection(this.firestore, 'users'), { userAsJson });
    await setDoc(doc(this.firestore, "users", this.user.id), userAsJson);
    this.loading = false;
  }
}
