import { Component, inject } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from '@firebase/app';
import { getAdditionalUserInfo } from 'firebase/auth';
import { collection, doc, getDoc, getDocFromCache, getFirestore, onSnapshot } from 'firebase/firestore';
import { UserDetailEditDialogComponent } from '../user-detail-edit-dialog/user-detail-edit-dialog.component';
import { EditUserAdressDialogComponent } from '../edit-user-adress-dialog/edit-user-adress-dialog.component';
import { User } from '../models/user.class';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';


@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})


export class DetailCardComponent {
  userId: any
  firestore: Firestore = inject(Firestore)
  user: any = {}
  db: any
  users: any
  allUsers: any


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
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
    this.userId = this.route.snapshot.paramMap.get('id')
    this.getUser()
  }


  async getUser() {
    const docRef = onSnapshot(doc(this.db, "users", this.userId), (doc) => {
      this.user = doc.data()
      console.log(this.user)
    });
  }


  openDialogUserEdit() {
    let dialog = this.dialog.open(UserDetailEditDialogComponent)
    dialog.componentInstance.user = new User(this.user);
  }


  openDialogAddress() {
    let dialog = this.dialog.open(EditUserAdressDialogComponent)
    dialog.componentInstance.user = new User(this.user);
  }

  openNote() {
    
  }

  addNote() {
    let dialog = this.dialog.open(AddNoteDialogComponent)
  }
}
