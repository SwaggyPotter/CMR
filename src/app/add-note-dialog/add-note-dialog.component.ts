import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { Inject, } from '@angular/core';
import { collectionData, } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { getAdditionalUserInfo } from 'firebase/auth';
import { UserDetailEditDialogComponent } from '../user-detail-edit-dialog/user-detail-edit-dialog.component';
import { EditUserAdressDialogComponent } from '../edit-user-adress-dialog/edit-user-adress-dialog.component';
import { User } from '../models/user.class';

import { NoteComponentComponent } from '../note-component/note-component.component';
import { DetailCardComponent } from '../detail-card/detail-card.component';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss']
})
export class AddNoteDialogComponent {
  userId: any;
  firestore: Firestore = inject(Firestore);
  user: any = {};
  db: any;
  users: any;
  allUsers: any;
  title: string = '';
  note: string = '';
  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DetailCardComponent) {
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
    this.userId = data.userId
    this.getUser()
  }

  async saveNote(title: string, note: string) {
    console.log(title, note)
    const docRef = onSnapshot(doc(this.db, "users", this.userId), (doc) => {
      this.user = doc.data()

    });

  }

  async getUser() {
    const docRef = onSnapshot(doc(this.db, "users", this.userId), (doc) => {
      this.user = doc.data()
      console.log(this.user.title)
      console.log(this.user.notes)
    });
  }
}
