import { Component, Inject, inject } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { initializeApp } from '@firebase/app';
import { getAdditionalUserInfo } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocFromCache, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { UserDetailEditDialogComponent } from '../user-detail-edit-dialog/user-detail-edit-dialog.component';
import { EditUserAdressDialogComponent } from '../edit-user-adress-dialog/edit-user-adress-dialog.component';
import { User } from '../models/user.class';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { NoteComponentComponent } from '../note-component/note-component.component';
import { AreYouSureComponent } from '../are-you-sure/are-you-sure.component';


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
  allUsers: any;
  title: string = '';
  note: string = '';
  numberOf: number = 0;
  freshData: any

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
    this.userId = this.route.snapshot.paramMap.get('id')
    this.getUser()
    this.getRoute()
  }


  async getUser() {
    const docRef = onSnapshot(doc(this.db, "users", this.userId), (doc) => {
      this.user = doc.data()
    });
  }


  async deleteContact() {
    await deleteDoc(doc(this.db, "users", this.userId));
    await setDoc(doc(this.firestore, "userJoinedLeaved", 'userLeaved'), this.freshData)
    this.router.navigate(['/main-site/user']);
  }

  getJoinMonth() {
    let month: number = new Date().getMonth()
    month++
    return {
      month
    }
  }


  getYear() {
    let year = new Date().getFullYear()
    return {
      year
    }
  }


  async getRoute() {
    const unsub = onSnapshot(doc(this.db, "userJoinedLeaved", "userLeaved"), (doc) => {
      let data: any = doc.data();
      let year = this.getYear()['year'];
      let month = this.getJoinMonth()['month'];
      data[year][month]++;
      console.log(data)
      this.freshData = data
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

  openDialogAreUSure(): void {
    let dialog = this.dialog.open(AreYouSureComponent, {
      data: {
        userId: this.userId
      }
    })
  }

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

  addNote(): void {
    let dialog = this.dialog.open(AddNoteDialogComponent, {
      data: {
        userId: this.userId,
      }
    })
  }
}
