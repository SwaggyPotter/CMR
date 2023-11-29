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

/**
 * Get the user income and calc the meridian of the user income.
 * Push the data to the graph config.
 */
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
    this.graph.data[0]['x'] = counterArr
    this.graph.data[0]['y'] = data;
    this.calcMeridian(data)
    this.isDataReady = true;
  }


  /**
   * 
   * @param sumArr give back the meridian of all incomes
   */
  calcMeridian(sumArr: any) {
    this.sumTotal = 0;
    for (let i = 0; i < sumArr.length; i++) {
      let element = sumArr[i];
      this.sumTotal += parseInt(element)
    }
    this.sumTotal = (this.sumTotal / sumArr.length)
  }

  
  /**
   * The graph data for the income diagramm
   */
  public graph = {
    data: [
      { x: [], y: [], type: 'bar', mode: 'lines+points', marker: { color: 'blue' } },
    ],
    layout: {
      height: 250, title: 'User income', paper_bgcolor: '#303030', plot_bgcolor: '#303030',
      font: {
        size: 12,
        color: 'white'       // Schriftfarbe
      },
    },
    config: { responsive: true }
  };
}
