
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, getDocs, getFirestore, onSnapshot } from 'firebase/firestore';
import { initializeApp } from '@angular/fire/app';


@Component({
  selector: 'app-user-diagramm',
  templateUrl: './user-diagramm.component.html',
  styleUrls: ['./user-diagramm.component.scss'],
})


export class UserDiagrammComponent {
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
    this.userJoinedList()
    this.userLeavedList()
  }


  /*Get the user data*/
  async getUser() {
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {
      this.userArray.push(doc.id)
    });
    this.isDataReady = true;
  }


  /*
  *Update the user joinded database
  */
  async userJoinedList() {
    const unsub = onSnapshot(doc(this.db, "userJoinedLeaved", "userJoined"), (doc) => {
      this.userJoinData = doc.data()
      let pufferArray = []
      for (let i = 1; i < 13; i++) {
        pufferArray.push(this.userJoinData[2023][i])
      }
      this.graph.data[0]['y'] = pufferArray
    });
  }


/*Update the user leaved list*/
  async userLeavedList() {
    const unsub = onSnapshot(doc(this.db, "userJoinedLeaved", "userLeaved"), (doc) => {
      this.userLeaveData = doc.data()
      let pufferArray = []
      for (let i = 1; i < 13; i++) {
        pufferArray.push(this.userLeaveData[2023][i] - (this.userLeaveData[2023][i] * 2))
      }
      this.graph.data[1]['y'] = pufferArray
    });
  }


/*The graph data for the user joinded laved diagram*/
  public graph = {
    data: [
    /*x=month*/{
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],/*y=user*/ y: [],
        type: 'bar', mode: 'lines+points', marker: { color: 'green' }, name: 'user joined'
      },
      {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], y: [0], type: 'bar', marker: { color: 'red' }
        , name: 'user leaved'
      },
    ],
    layout: {
      title: 'Total user over 12 month', height: 250, paper_bgcolor: '#303030', plot_bgcolor: '#303030',
      font: {
        size: 12,
        color: 'white'
      },
    },
    config: { responsive: true },
  };
}

