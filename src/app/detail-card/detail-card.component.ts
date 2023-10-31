import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from '@firebase/app';
import { getAdditionalUserInfo } from 'firebase/auth';
import { collection, doc, getDoc, getDocFromCache, getFirestore } from 'firebase/firestore';
import { UserDetailEditDialogComponent } from '../user-detail-edit-dialog/user-detail-edit-dialog.component';
import { EditUserAdressDialogComponent } from '../edit-user-adress-dialog/edit-user-adress-dialog.component';
import { User } from '../models/user.class';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent {
  userId: any
  firestore: Firestore = inject(Firestore)
  user: any = {}
  db: any

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
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
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')
    console.log('the id is: ', this.userId)
    this.getUser()

    const docRef = doc(this.firestore, "users", this.userId);
    console.log(getDoc(doc(this.firestore, 'users', this.userId)))
  }

  async getUser() {
    const docRef = doc(this.db, "users", this.userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.user = docSnap.data()
      console.log(this.user)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  openDialogUserEdit() {
    let dialog = this.dialog.open(UserDetailEditDialogComponent)
    dialog.componentInstance.user = new User(this.user);
  }

  openDialogAddress() {
    let dialog = this.dialog.open(EditUserAdressDialogComponent)
    dialog.componentInstance.user = new User(this.user);
  }
}
