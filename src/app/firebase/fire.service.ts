import { Injectable } from '@angular/core';
import firebase from  'firebase/compat/app'
import 'firebase/compat/firestore';
import * as config  from 'firebaseconfig';




@Injectable({
  providedIn: 'root'
})
export class FireService {

 firebaseApplication ;
 firestore:firebase.firestore.Firestore;

  constructor() {

    this.firebaseApplication=firebase.initializeApp(config.firebaseConfig)
    this.firestore=firebase.firestore();

    this.firestore.collection('userInfo').add({name:'Madi',personalInfo:'Chef'})
   }
}
