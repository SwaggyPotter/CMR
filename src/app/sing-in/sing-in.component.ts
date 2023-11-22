import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EmailAuthCredential } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})



export class SingInComponent {
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
  email: string = ''
  password: string = ''

  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }

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

  }

  singInData = {
    Email: '',
    password: ''
  }


  getInput() {
    this.singInData.Email = this.email
    this.singInData.password = this.password
    console.log(this.singInData)
    this.loadLoginData()
  }

  pufferArray = [];

  async loadLoginData() {
    const querySnapshot = await getDocs(collection(this.db, "logins"));
    querySnapshot.forEach((doc) => {
      //console.log(JSON.parse(doc.data()['emailsAndPasswords']))

      this.pufferArray = doc.data()['emailsAndPasswords'];
    });
    this.login()
  }

  login() {
    for (let i = 0; i < this.pufferArray.length; i++) {
      const element = this.pufferArray[i];
      let data = JSON.parse(this.pufferArray[i])
      const value = Object.keys(data).map(key => data[key]);
      if (value[0] == this.singInData.Email && value[1] == this.singInData.password) {
        console.log('Login success')
        this._router.navigateByUrl('/main-site/dashboard')
      }

    }


  }





}
