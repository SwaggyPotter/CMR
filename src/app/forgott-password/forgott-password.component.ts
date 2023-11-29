import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
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
  newUserPW: any = {
    "Email": "",
    "name": "",
    "password": ""
  }
  newPassword: any
  emailPasswords: any
  emailAndPasswordPuffer: string[] = []
  matchingItemNumber: number = 0;
  form = ({
    from_name: ['Password Bot'],
    from_email: ['Password@reset-service.de'],
    message: ['Here is your reset code: ']
  });


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
    this.getUser();
  }


  /**
   * get the user logins
   */
  async getUser() {
    let i: number = 0;
    const querySnapshot = await getDocs(collection(this.db, "logins"));
    querySnapshot.forEach((doc) => {
      this.pufferArray = doc.data()['emailsAndPasswords'];
    });
  }


  /**
   * get the code from the backend to reset the password
   * @param email 
   */
  async getCodesAndEmail(email: string) {
    const docRef = doc(this.db, "passwordForget", email);
    const docSnap: any = (await getDoc(docRef)).data();
    const value = Object.keys(docSnap).map(key => docSnap[key]);
    if (this.codeInput == value[0]) {
      this.codeEnter = false;
      this.enterNEwPw = true;
    }
  }


  /**
   * store the searched email
   */
  searchEmail: any = {
    Email: '',
  }


  /**
   * array for any function to store the user etc.
   */
  pufferArray = [];


  /**
   * searching for the email from the input
   */
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


/**
 * Update the user password and store it to the backend 
 */
  async setNewPassword() {
    const querySnapshot = await getDocs(collection(this.db, "logins"));
    querySnapshot.forEach((doc) => {
      this.emailPasswords = doc.data()['emailsAndPasswords']
    });
    for (let i = 0; i < this.emailPasswords.length; i++) {
      const element = this.emailPasswords[i];
      let data: any = JSON.parse(this.emailPasswords[i])
      const value = Object.keys(data).map(key => data[key]);
      if (value[1] == this.searchEmail.Email) {
        this.newUserPW = JSON.parse(this.emailPasswords[i])
        this.newUserPW.password = this.newPassword
        this.emailPasswords[i] = JSON.stringify(this.newUserPW)
        await setDoc(doc(this.db, "logins", "emailsAndPassword"), { "emailsAndPasswords": this.emailPasswords });
        this._router.navigate(['/sing-in']);
      }
    }
  }


  /**
   * Save the reset code to the backend
   * @param randomCode random genaratet number
   * @param email the email who chosed for reseting the password
   */
  async setCode(randomCode: any, email: string) {
    await setDoc(doc(this.db, "passwordForget", email), { "code": randomCode });
    this.form.message = ['Here is your reset code: ', randomCode]
    this.sendEmail()
  }


  /**
   * get the email from the email input
   */
  getInput() {
    this.searchEmail.Email = this.email
    this.searchForEmail()
  }


  /**
   * 
   * @returns returns a random number
   */
  getRandomId() {
    return Math.floor((Math.random() * 125205) + 24457);
  }


  /**
   * Send a email with the in the backend stored code
   */
  async sendEmail() {
    emailjs.init('HXRHgLXNMAqXvgQza');
    let response = await emailjs.send('service_gjpw7iv', 'template_7extjmi', {
      from_name: this.form.from_name,
      from_email: this.form.from_email,
      message: this.form.message
    });
  }
}
