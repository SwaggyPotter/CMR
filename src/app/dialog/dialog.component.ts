import { Component, inject } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore } from '@angular/fire/firestore';
import { doc, onSnapshot, setDoc } from '@firebase/firestore';
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
  freshData: any


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
    this.db = getFirestore(app);
    this.getRoute()
  }


  /**
   * get the data of user who joined
   */
  async getRoute() {
    const unsub = onSnapshot(doc(this.db, "userJoinedLeaved", "userJoined"), (doc) => {
      let data: any = doc.data();
      let year = this.getYear()['year'];
      let month = this.getJoinMonth()['month'];
      data[year][month]++;
      this.freshData = data
    });
  }


  /**
   * add a new user to the backend
   */
  async addUser() {
    this.loading = true;
    this.user.id = this.getRandomId().toString()
    this.user.joinMonth = this.getJoinMonth()['month']
    this.user.joinYear = this.getYear()['year']
    let userAsJson = this.user.toJSON()
    console.log(userAsJson)
    await setDoc(doc(this.firestore, "users", this.user.id), userAsJson);
    await setDoc(doc(this.firestore, "userJoinedLeaved", 'userJoined'), this.freshData)
    this.loading = false;
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
   * @returns returns a random generatet id
   */
  getRandomId() {
    return Math.floor((Math.random() * 1254216205) + 2456457);
  }


  /**
   * save the users birthdate as timestamp
   */
  saveUser() {
    this.user.birthDate = this.birthdate.getTime();
    this.addUser();
  }


  /**
   * close the dialog
   */
  closeDialog() {
    this.dialogRef.close();
  }
}
