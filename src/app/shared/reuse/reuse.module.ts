import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import {AntModule} from "../ant/ant.module";

const components=[
  NotFoundComponent
]

@NgModule({
  declarations: [
    ... components
  ],
  imports: [
    CommonModule,
    AntModule
  ],exports:[
    ... components
  ]
})
export class ReuseModule { }
