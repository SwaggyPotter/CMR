import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';


@Component({
  selector: 'app-age-diagramm',
  templateUrl: './age-diagramm.component.html',
  styleUrls: ['./age-diagramm.component.scss']
})


export class AgeDiagrammComponent {
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
      if (value != 0) {
        i++
        counterArr.push(i)
        data.push(value)
      }
    });
    this.isDataReady = true;
  }



  public graph = {

    data: [
      { values: [2, 3, 4, 4], type: 'pie', mode: 'lines+points', marker: { color: 'blue' } },

    ],
    layout: {
      height: 250, title: 'User Age', paper_bgcolor: '#303030', plot_bgcolor: '#303030',
      font: {
        size: 12,
        color: 'white'       // Schriftfarbe
      },
    },
    config: { responsive: true }
  };
}
