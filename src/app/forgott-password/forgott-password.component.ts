import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, FormGroup, } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EmailAuthCredential } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';




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
  codeInput: any = 0;
  emailPassWArray: any


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
    this.setNewPassword()
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
    const docSnap: any = (await getDoc(docRef)).data();
    const value = Object.keys(docSnap).map(key => docSnap[key]);
    if (this.codeInput == value[0]) {
      this.codeEnter = false;
      this.enterNEwPw = true;
    }
  }


  searchEmail = {
    Email: 'tim.spiele1@freenet.de',
  }


  pufferArray = [];


  searchForEmail() {
    for (let i = 0; i < this.pufferArray.length; i++) {
      const element = this.pufferArray[i];
      let data = JSON.parse(this.pufferArray[i])
      const value = Object.keys(data).map(key => data[key]);
      if (value[1] == this.searchEmail.Email) {
        this.setCode(this.getRandomId(), this.searchEmail.Email)
        this.emailEnter = false;
        this.codeEnter = true;
      }
    }
  }


  newPassword: any
  emailPasswords: any
  emailAndPasswordPuffer: string[] = []
  matchingItemNumber: number = 0;
  async setNewPassword() {
    const querySnapshot = await getDocs(collection(this.db, "logins"));
    querySnapshot.forEach((doc) => {
      this.emailPasswords = doc.data()['emailsAndPasswords']
    });

    for (let i = 0; i < this.emailPasswords.length; i++) {
      const element = this.emailPasswords[i];
      let data: any = JSON.parse(this.emailPasswords[i])
      const value = Object.keys(data).map(key => data[key]);
      console.log(data)
      console.log(this.searchEmail.Email)
      console.log(value[1])
      if (value[1] == this.searchEmail.Email) {
        console.log('Position: ', i, 'und item:', this.searchEmail.Email)
      }
    }
  }


  async setCode(randomCode: any, email: string) {
    await setDoc(doc(this.db, "passwordForget", email), { "code": randomCode });
    this.form.message = ['Here is your reset code: ', randomCode]
    this.sendEmail()
  }


  getInput() {
    this.searchEmail.Email = this.email
    console.log(this.searchEmail)
    this.searchForEmail()
  }


  getRandomId() {
    return Math.floor((Math.random() * 125205) + 24457);
  }


  form = ({
    from_name: ['Password Bot'],
    from_email: ['Password@reset-service.de'],
    message: ['Here is your reset code: ']
  });


  async sendEmail() {
    emailjs.init('HXRHgLXNMAqXvgQza');
    let response = await emailjs.send('service_gjpw7iv', 'template_7extjmi', {
      from_name: this.form.from_name,
      from_email: this.form.from_email,
      message: this.form.message
    });
  }


}
