import { Component, Inject, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from '@firebase/app';
import { deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { DetailCardComponent } from '../detail-card/detail-card.component';


@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss']
})


export class AreYouSureComponent {
  userId: any;
  firestore: Firestore = inject(Firestore);
  user: any = {};
  db: any;
  users: any;
  freshData: any


  constructor(private route: ActivatedRoute, public router: Router, @Inject(MAT_DIALOG_DATA) public data: DetailCardComponent, private dialogRef: MatDialogRef<AreYouSureComponent>) {
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
    this.getRoute()
  }

  
/**
 * get the user by the id
 */
  async getUser() {
    const docRef = onSnapshot(doc(this.db, "users", this.userId), (doc) => {
      this.user = doc.data()
    });
  }


/**
 * delete the by the id choosen contact and navigatte to the user list
 */
  async deleteContact() {
    await deleteDoc(doc(this.db, "users", this.userId));
    await setDoc(doc(this.firestore, "userJoinedLeaved", 'userLeaved'), this.freshData)
    this.router.navigate(['/main-site/user']);
    this.dialogRef.close();
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
   * update the data for people who leaved
   */
  async getRoute() {
    const unsub = onSnapshot(doc(this.db, "userJoinedLeaved", "userLeaved"), (doc) => {
      let data: any = doc.data();
      let year = this.getYear()['year'];
      let month = this.getJoinMonth()['month'];
      data[year][month]++;
      this.freshData = data;
    });
  }
}
