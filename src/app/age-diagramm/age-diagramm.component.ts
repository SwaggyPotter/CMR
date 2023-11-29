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
  sumTotal: number = 0;
  age: any = 0;
  youngestAge: number = 0;
  oldestAge: number = 10;
  rounds: number = 0
  dataArray: number[] = [];


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
   * Get the user age data
   */
  ageArray: any = []
  async getUser() {
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
      this.ageArray.push(doc.data()['birthDate'])
    });
    this.isDataReady = true;
    this.fillTheGraphData()
  }


  /**
   * Fill the array with the ages of the user and the amount 
   */
  fillTheGraphData() {
    let Counter = 0;
    for (let i = 0; i < this.ageArray.length; i++) {
      let element = this.ageArray[i];
      element = new Date(element);
      this.age = new Number((new Date().getTime() - element.getTime()) / 31536000000).toFixed(0);
      if (this.age <= this.oldestAge && this.age >= this.youngestAge) {
        Counter++
      }
    }
    this.dataArray.push(Counter)
    this.youngestAge += 10
    this.oldestAge += 10
    this.rounds++
    if (this.rounds <= 9) {
      this.fillTheGraphData()
    }
  }


  /**
   * The graph data and config
   */
  public graph = {
    data: [
      {
        values: this.dataArray,
        labels: ["Age 0 - 10", "Age 10 - 20", "Age 20 - 30", "Age 30 - 40", "Age 40 - 50", "Age 50 - 60", "Age 60 - 70", "Age 70 - 80", "Age 80 - 90", "Age 90 - 100"],
        type: 'pie',
        textposition: "inside",
        marker: { color: 'blue' },
        insidetextorientation: "radial"

      },
    ],
    layout: {
      height: 400,
      width: 400, title: 'User Age', paper_bgcolor: '#303030', plot_bgcolor: '#303030',
      font: {
        size: 12,
        color: 'white'       // Schriftfarbe
      },
    },
    config: { responsive: true }
  };
}
