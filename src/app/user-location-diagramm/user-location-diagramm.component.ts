import { Component, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, getFirestore } from 'firebase/firestore';


@Component({
  selector: 'app-user-location-diagramm',
  templateUrl: './user-location-diagramm.component.html',
  styleUrls: ['./user-location-diagramm.component.scss']
})


export class UserLocationDiagrammComponent {
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
  userJoinData: any;
  userLeaveData: any;
  lastCity: any = null;
  cityCount: any = 0;
  graphArrayX: any = []
  graphArrayY: any = []
  i: any
  topCity: string = '';


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
    this.getUser();
  }


  async getUser() {
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
      this.userArray.push(doc.data()['city'])
    });
    this.isDataReady = true;
    this.fillTheCords();
  }


  fillTheCords() {
    const that = this
    let arrayRounds: number = 0;
    this.userArray = this.userArray.sort()
    this.userArray.forEach(function (city: any) {
      arrayRounds++
      console.log(arrayRounds);
      console.log(city);
      if (that.userArray.length == arrayRounds) {
        that.graphArrayX.push(city);
        that.graphArrayY.push(that.cityCount += 1);
        that.graph.data[0]['x'] = that.graphArrayX;
        that.graph.data[0]['y'] = that.graphArrayY;
      }
      if (that.lastCity == null || that.lastCity == city) {
        that.cityCount++;
        that.lastCity = city;
      }
      else {
        that.graphArrayX.push(that.lastCity);
        that.graphArrayY.push(that.cityCount);
        that.lastCity = city;
        that.cityCount = 1;
      }
    });
    this.topCity = this.graphArrayX[this.indexOfMax(that.graphArrayY)];
  }


  indexOfMax(arr: any) {
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  }


  public graph = {
    data: [
    /*x=citys*/{
        x: [],/*y=user amount*/ y: [],
        type: 'bar', mode: 'lines+points', marker: { color: 'green' }, name: 'user joined'
      },],

    layout: {
      title: 'Top user Citys', height: 250, paper_bgcolor: '#303030', plot_bgcolor: '#303030',
      font: {
        size: 12,
        color: 'white'       // Schriftfarbe
      },
    },
    config: { responsive: true },

  };

}
