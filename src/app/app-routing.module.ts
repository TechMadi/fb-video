import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from "./default/default.component";
import {NotFoundComponent} from "./shared/reuse/not-found/not-found.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'fire' },
  {path:'auth',loadChildren:()=>import('./shared/auth/auth.module').then(m=>m.AuthModule)},
  {path:'fire',component:DefaultComponent,children:[
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },

    ]},
  {path:"**",component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
