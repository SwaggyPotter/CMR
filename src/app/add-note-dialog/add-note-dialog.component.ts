import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import { DetailCardComponent } from '../detail-card/detail-card.component';
import { getDatabase } from 'firebase/database';


@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss']
})


export class AddNoteDialogComponent {
  userId: any;
  firestore: Firestore = inject(Firestore);
  user: any = User;
  db: any;
  users: any;
  allUsers: any;
  title: string = '';
  note: string = '';
  loading: boolean = false;


  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DetailCardComponent, public dialogRef: MatDialogRef<AddNoteDialogComponent>) {
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
    this.userId = data.userId;
    this.getUser();
  }


  /**
   * 
   * @param title The input from the title input of the html document
   * @param note The note from the note input of the html document
   */
  async saveNote(title: string, note: string) {
    this.loading = true;
    const db = getDatabase();
    this.user.title.push(title);
    this.user.notes.push(note);
    let userAsJson = this.user;
    await setDoc(doc(this.firestore, "users", this.user.id), userAsJson);
    this.loading = false;
    this.dialogRef.close();
  }


  /**
   * Get the user by the id
   */
  async getUser() {
    const docRef = onSnapshot(doc(this.db, "users", this.userId), (doc) => {
      this.user = doc.data();
    });
  }
}
