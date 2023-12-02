import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
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
  email: string = ''
  password: string = ''
  hide: boolean = true;
  passwordEmailWrong: boolean = false;
  pufferArray = [];
  showName: string = ''
  singInData = {
    Email: '',
    password: ''
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


  myFunction() {
    this.hide = !this.hide;
  }


/**
 * Get the input from the email and password field
 */
  getInput() {
    this.singInData.Email = this.email
    this.singInData.password = this.password
    this.loadLoginData()
  }


 /**
  * Load the login data of all user
  */
  async loadLoginData() {
    const querySnapshot = await getDocs(collection(this.db, "logins"));
    querySnapshot.forEach((doc) => {
      this.pufferArray = doc.data()['emailsAndPasswords'];
    });
    this.login();
  }


  /**
   * Push the user name into the local storage
   */
  nameToStorage() {
    localStorage.setItem('currentUser', this.showName);
  }

  
/**
 * Perform the login
 */
  login() {
    for (let i = 0; i < this.pufferArray.length; i++) {
      const element = this.pufferArray[i];
      let data = JSON.parse(this.pufferArray[i])
      const value = Object.keys(data).map(key => data[key]);
      if (value[1] == this.singInData.Email && value[2] == this.singInData.password) {
        this.showName = value[0]
        this.nameToStorage()
        this._router.navigateByUrl('/main-site/dashboard')
      }
      else {
        this.passwordEmailWrong = true;
        setTimeout(() => {
          this.passwordEmailWrong = false;
        }, 5000)
      }
    }
  }
}
