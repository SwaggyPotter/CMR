import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { getDocs, getFirestore } from 'firebase/firestore';
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
    this.graph.data[0]['y'][2] = this.userAmount;
    this.isDataReady = true;
  }


  public graph = {
    data: [
      { x: [0, 5, 10, 15, 20], y: [0, 10, 15, 20, 65], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
    ],
    layout: { width: 250, height: 240, title: 'Total user over time' }
  };
}

