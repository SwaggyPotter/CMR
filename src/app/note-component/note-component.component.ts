import { Component, inject, Inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { getDatabase } from 'firebase/database';
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { DetailCardComponent } from '../detail-card/detail-card.component';


@Component({
  selector: 'app-note-component',
  templateUrl: './note-component.component.html',
  styleUrls: ['./note-component.component.scss']
})
export class NoteComponentComponent {
  userId: any;
  firestore: Firestore = inject(Firestore);
  user: any = {};
  db: any;
  users: any;
  allUsers: any;
  title: string = '';
  note: string = '';
  itemNumber: number = 0;
  loading: boolean = false;

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
    this.userId = data.userId;
    this.itemNumber = data.numberOf;
    this.getUser()
  }

  /**
   * Function to delete the title and note
   * @param index type:number, position of the item that get deletet
   */
  async deleteNote(index: number) {
    this.loading = true;
    this.user.title.splice(this.itemNumber, 1)
    this.user.notes.splice(this.itemNumber, 1)
    const db = getDatabase();
    let userAsJson = this.user;
    await setDoc(doc(this.firestore, "users", this.user.id), userAsJson);
    this.loading = false;
  }


  async getUser() {
    const docRef = onSnapshot(doc(this.db, "users", this.userId), (doc) => {
      this.user = doc.data()
    });
  }
}
