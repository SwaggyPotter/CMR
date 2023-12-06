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
  userArray: any = [];
  isDataReady: boolean = false;
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


  /**
   * Get the user data
   */
  async getUser() {
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
      this.userArray.push(doc.data()['city'])
    });
    this.isDataReady = true;
    this.fillTheCords();

  }


  /**
   * Fill the diagramm cordinates with the amount and name of the user cities
   */
  fillTheCords() {
    const that = this
    let arrayRounds: number = 0;
    this.userArray = this.userArray.sort()
    this.userArray.forEach(function (city: any) {
      arrayRounds++
      if (that.userArray.length === arrayRounds) {
        that.fillCordsLastRound(city)
      }
      else if (that.lastCity == null || that.lastCity == city) {
        that.cityCount++;
        that.lastCity = city;
      }
      else {
        that.fillTheCordsNormal(city)
      }
    });
    this.topCity = this.graphArrayX[this.indexOfMax(that.graphArrayY)];
  }


  /**
   * If a city only exist once, the city and the number 1 send to the array
   * @param city a city
   */
  fillTheCordsNormal(city: any) {
    this.graphArrayX.push(this.lastCity);
    this.graphArrayY.push(this.cityCount);
    this.lastCity = city;
    this.cityCount = 1;
  }


  /**
   * Perform the last round of filling the user city array and cords
   * @param city a city
   */
  fillCordsLastRound(city: any) {
    if (this.lastCity != city) {
      this.graphArrayX.push(this.lastCity);
      this.graphArrayY.push(this.cityCount);
    }
    if (this.lastCity == null || this.lastCity == city) {
      this.graphArrayX.push(city);
      this.graphArrayY.push(this.cityCount);
      this.graph.data[0]['x'] = this.graphArrayX;
      this.graph.data[0]['y'] = this.graphArrayY;
    }
    else {
      this.graphArrayX.push(city);
      this.graphArrayY.push(1);
      this.graph.data[0]['x'] = this.graphArrayX;
      this.graph.data[0]['y'] = this.graphArrayY;
    }
  }


  /**
   * Function for returning the item with the most amount
   * @param arr array
   * @returns the item with the most amount in the array
   */
  indexOfMax(arr: any) {
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  }


  /**
   * Data for the graph 
   */
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
