import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RestoreComponent } from './restore/restore.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'restore', component: RestoreComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInUpRoutingModule { }
