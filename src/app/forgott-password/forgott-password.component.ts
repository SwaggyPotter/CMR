import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EmailAuthCredential } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgott-password',
  templateUrl: './forgott-password.component.html',
  styleUrls: ['./forgott-password.component.scss']
})
export class ForgottPasswordComponent {
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
  userAmount: number = 0;
  userArray: any = [];
  isDataReady: boolean = false;
  incomeArray: any = [];
  openDocDataIncome: any;
  sumTotal: number = 0;
  email: string = '';
  password: string = '';
  hide: boolean = true;
  passwordEmailWrong: boolean = false;
  emailEnter: boolean = true;
  codeEnter: boolean = false;
  enterNEwPw: boolean = false;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
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
    this.getUser()
    //this.getCodesAndEmail()
  }

  async getUser() {
    let i: number = 0;
    const querySnapshot = await getDocs(collection(this.db, "logins"));
    querySnapshot.forEach((doc) => {
      this.pufferArray = doc.data()['emailsAndPasswords'];
    });
  }

  async getCodesAndEmail(email: string) {
    const docRef = doc(this.db, "passwordForget", email);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
  }

  searchEmail = {
    Email: '',
  }

  pufferArray = [];


  searchForEmail() {
    for (let i = 0; i < this.pufferArray.length; i++) {
      const element = this.pufferArray[i];
      let data = JSON.parse(this.pufferArray[i])
      const value = Object.keys(data).map(key => data[key]);
      if (value[1] == this.searchEmail.Email) {
        this.setCode(this.getRandomId(), this.searchEmail.Email)
        console.log('Email gefunden')
      }
    }
  }

  async setCode(randomCode: any, email: string) {
    console.log(randomCode, email)
    await setDoc(doc(this.db, "passwordForget", email), randomCode);
  }

  getInput() {
    this.searchEmail.Email = this.email
    console.log(this.searchEmail)
    this.searchForEmail()
  }

  getRandomId() {
    return Math.floor((Math.random() * 125205) + 24457);
  }
}
