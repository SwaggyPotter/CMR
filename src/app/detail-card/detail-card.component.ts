import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from '@firebase/app';
import { deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { UserDetailEditDialogComponent } from '../user-detail-edit-dialog/user-detail-edit-dialog.component';
import { EditUserAdressDialogComponent } from '../edit-user-adress-dialog/edit-user-adress-dialog.component';
import { User } from '../models/user.class';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { NoteComponentComponent } from '../note-component/note-component.component';
import { AreYouSureComponent } from '../are-you-sure/are-you-sure.component';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})


export class DetailCardComponent {
  userId: any;
  firestore: Firestore = inject(Firestore);
  user: any = {};
  db: any;
  users: any;
  title: string = '';
  note: string = '';
  numberOf: number = 0;
  freshData: any
  age: any;
  birtday: any;
  deleting: boolean = true;


  constructor(private route: ActivatedRoute, public dialog: MatDialog, public router: Router) {
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
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.getRoute();
  }


  /**
   * Get all the current user by the id
   */
  async getUser() {
    const docRef = onSnapshot(doc(this.db, "users", this.userId), (doc) => {
      this.user = doc.data();
      if (this.user) {
        this.calcBirthday();
      }
    });
  }


  /**
   * delete the contact in the backend and navigate to the user list
   */
  async deleteContact() {
    this.router.navigate(['/main-site/user']);
    this.deleting = false;
    await deleteDoc(doc(this.db, "users", this.userId));
    await setDoc(doc(this.firestore, "userJoinedLeaved", 'userLeaved'), this.freshData);
    this.user = null;
  }


  /**
   * Give back the number of the age based on the timestamp.
   */
  calcBirthday() {
    this.birtday = new Date(this.user.birthDate);
    this.age = new Number((new Date().getTime() - this.birtday.getTime()) / 31536000000).toFixed(0);
  }


  /**
   * @returns returns the month
   */
  getJoinMonth() {
    let month: number = new Date().getMonth()
    month++
    return {
      month
    }
  }


  /**
   * @returns returns the year
   */
  getYear() {
    let year = new Date().getFullYear()
    return {
      year
    }
  }


  /**
   * Update the data with people wo came
   */
  async getRoute() {
    const unsub = onSnapshot(doc(this.db, "userJoinedLeaved", "userLeaved"), (doc) => {
      let data: any = doc.data();
      let year = this.getYear()['year'];
      let month = this.getJoinMonth()['month'];
      data[year][month]++;
      this.freshData = data
    });
  }


  /**
   * Open the edit card for users adress, emmail and phone number.
   */
  openDialogUserEdit() {
    let dialog = this.dialog.open(UserDetailEditDialogComponent)
    dialog.componentInstance.user = new User(this.user);
  }


  /**
   * open the edit card for editing the users adress
   */
  openDialogAddress() {
    let dialog = this.dialog.open(EditUserAdressDialogComponent)
    dialog.componentInstance.user = new User(this.user);
  }


  /**
   * open the dialog who ask: if u sure u want delete the contact?
   */
  openDialogAreUSure(): void {
    let dialog = this.dialog.open(AreYouSureComponent, {
      data: {
        userId: this.userId
      }
    })
  }


  /**
   * Open the note u choose
   * @param i index number of the note you want to open
   */
  openNote(i: number): void {
    this.title = this.user['title'][i]
    this.note = this.user['notes'][i]
    this.numberOf = i;
    this.dialog.open(NoteComponentComponent, {
      data: {
        title: this.title,
        note: this.note,
        userId: this.userId,
        numberOf: this.numberOf
      }
    })
  }


  /**
   * Open the dialog for adding a note
   */
  addNote(): void {
    let dialog = this.dialog.open(AddNoteDialogComponent, {
      data: {
        userId: this.userId,
      }
    })
  }
}
