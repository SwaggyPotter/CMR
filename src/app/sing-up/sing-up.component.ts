import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent {
  email: string = '';
  password: string = '';
  name: string = '';
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

  hide: boolean = true;



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


  pufferArray = [];

  singInData = {
    Email: '',
    password: '',
    name: ''
  }


  async createAccount() {
    const querySnapshot = await getDocs(collection(this.db, "logins"));
    querySnapshot.forEach((doc) => {
      this.pufferArray = doc.data()['emailsAndPasswords'];
    });
    this.singInData.Email = this.email
    this.singInData.password = this.password
    this.singInData.name = this.name
    console.log(this.singInData)
    this.checkAccountInformation();
  }


  checkAccountInformation() {
    for (let i = 0; i < this.pufferArray.length; i++) {
      const element = this.pufferArray[i];
      let data = JSON.parse(this.pufferArray[i])
      const value = Object.keys(data).map(key => data[key]);
      if (value[0] != this.singInData.Email) {
        if (i == this.pufferArray.length - 1) {
          console.log('Account createt')
        }
      }
      else {
        console.log('Your account already exist')
      }
    }
  }


  myFunction() {
    this.hide = !this.hide;
  }




}
