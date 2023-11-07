import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-income-diagramm',
  templateUrl: './income-diagramm.component.html',
  styleUrls: ['./income-diagramm.component.scss']
})
export class IncomeDiagrammComponent {
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

  constructor() {
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


  }


  async getUser() {
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.userArray.push(doc.id)
    });
    this.userAmount = this.userArray.length
    this.isDataReady = true;
  }

  public graph = {

    data: [
      { x: [0,1,2,3,4,5,6,7,8], y: [20000, 40000, 60000, 43590, 62736,49203,65374,52635], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },

    ],
    layout: { width: 250, height: 240, title: 'User income' }
  };
}
