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
  incomeArray: any = [];
  openDocDataIncome: any;

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
    let i: number = 0;
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
      this.userArray.push(doc.id)
      this.incomeArray.push(doc.data()['income'])
    });
    let data: any = [];
    let counterArr: any = [];
    this.incomeArray.forEach(function (value: any) {
      i++
      counterArr.push(i)
      data.push(value)
    });
    this.graph.data[0]['x'] = counterArr
    this.graph.data[0]['y'] = data;
    this.isDataReady = true;
  }

  public graph = {

    data: [
      { x: [], y: [], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },

    ],
    layout: { width: 550, height: 240, title: 'User income' }
  };
}
