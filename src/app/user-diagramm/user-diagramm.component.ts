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
      console.log(doc.id, " => ", doc.data());
      this.userArray.push(doc.id)
    });
    this.userAmount = this.userArray.length
    this.graph.data[0]['y'][2] = this.userAmount;
    this.graph.data[0]['y'].forEach(function (value) {
      console.log(value);
    });
    this.isDataReady = true;
  }





  public graph = {
    data: [
    /*x=month*/{
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],/*y=user*/ y: [0, 10, 15, 20, 65, 50, 40, 26, 17, 10, 37, 18],
        type: 'scatter', mode: 'lines+points', marker: { color: 'red' }
      },
    ],
    layout: { width: 550, height: 240, title: 'Total user over 12 month' }
  };
}

