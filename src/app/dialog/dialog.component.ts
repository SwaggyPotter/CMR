import { Component, inject } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, getDoc, getDocs, onSnapshot, setDoc } from '@firebase/firestore';
import { addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';
import { getDatabase } from 'firebase/database';
import { query } from '@angular/animations';


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
    setTimeout(()=>{
      console.log(this.freshData)
    },2000)
    this.getRoute()
  }

  async getRoute() {
    const unsub = onSnapshot(doc(this.db, "userJoinedLeaved", "userJoined"), (doc) => {
      let data: any = doc.data();
      let year = this.getYear()['year'];
      let month = this.getJoinMonth()['month'];
      data[year][month]++;
      console.log(data)
      this.freshData = data
    });
  }

  async addUser() {
    this.loading = true;
    this.user.id = this.getRandomId().toString()
    this.user.joinMonth = this.getJoinMonth()['month']
    this.user.joinYear = this.getYear()['year']
    let userAsJson = this.user.toJSON()
    await setDoc(doc(this.firestore, "users", this.user.id), userAsJson);
    await setDoc(doc(this.firestore, "userJoinedLeaved", 'userJoined'), this.freshData)
    this.loading = false;
    this.dialogRef.close();
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


  getRandomId() {
    return Math.floor((Math.random() * 1254216205) + 2456457);
  }


  saveUser() {
    this.user.birthDate = this.birthdate.getTime();
    this.addUser();
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
