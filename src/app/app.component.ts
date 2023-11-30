import { Component, inject } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { Firestore, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FireService } from './firebase/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-firebase';
 newMessage:any;
 email:any
 password:any
 constructor(public fireService:FireService){


 }
  getAll(){
  
  }
}
