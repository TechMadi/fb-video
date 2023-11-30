import { Injectable } from '@angular/core';
import firebase from  'firebase/compat/app'
import 'firebase/compat/firestore';
import * as config  from 'firebaseconfig';

import 'firebase/compat/auth';
import  'firebase/compat/storage'
import * as path from "path";

export interface MessageDTO{
  messageContent:string;
  timestamp:Date;
  user:string
  }


@Injectable({
  providedIn: 'root'
})


export class FireService {

 firebaseApplication ;
 firestore:firebase.firestore.Firestore;
 collectionName:string='fbvideo'
auth:firebase.auth.Auth
  storage:firebase.storage.Storage
  currentlySignedInUserAvatarURL:string="https://wbi.net.au/wp-content/uploads/2019/04/person-icon-silhouette-png-12-1-e1555982192147.png";

messages:any[]=[]

  constructor() {

    this.firebaseApplication=firebase.initializeApp(config.firebaseConfig)
    this.firestore=firebase.firestore();
    this.auth=firebase.auth();
    this.storage=firebase.storage()

    this.getMessages()

    this.auth.onAuthStateChanged(user=>{
      if(user){
        this.getMessages()
      }
    })

   }

 async   getImageOfSignedInUser():Promise<void>{
 this.currentlySignedInUserAvatarURL= await  this.storage.ref('avatar').child(this.auth.currentUser?.uid+"").getDownloadURL()
   }

 async  updateUserImage($event):Promise<void>{
  const img=$event.target.files[0]
  const uploadTask= await this.storage.ref('avatar').child(this.auth.currentUser?.uid+"").put(img)

  this.currentlySignedInUserAvatarURL= await uploadTask.ref.getDownloadURL();
   }

   sendMessage(newMessage:any){
    let messageDTO:MessageDTO={
      messageContent:newMessage,
      timestamp:new Date(),
      user:'some user'

    }
    this.firestore.collection(this.collectionName).add(messageDTO)
   }

    getMessages():void{
    const query=this.firestore.collection(this.collectionName).orderBy('timestamp').onSnapshot(snapShot=>{
      snapShot.docChanges().forEach(change=>{
        if(change.type=='added'){
          this.messages.push( {id:change.doc.id, data:change.doc.data()})
        }else if(change.type=='modified'){
          const index:number=this.messages.findIndex(document=>document.id!=change.doc.id)
          this.messages[index]={id:change.doc.id, data:change.doc.data()}
        } if (change.type=='removed'){
          this.messages=this.messages.filter(m=>m.id!=change.doc.id);
        }
      })
    })


   }

   register(email:string,password:string):void{
    this.auth.createUserWithEmailAndPassword(email,password)
   }
   signIn(email:string,password:string):void{
    this.auth.signInWithEmailAndPassword(email,password)
   }

   signOut():void{
  this.messages=[]
    this.auth.signOut()
   }
}
