import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingInComponent } from './sing-in/sing-in.component'
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingOutComponent } from './sing-out/sing-out.component'
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const routes: Routes = [
  {
    path: '',
    component: SingInComponent
  },
  {
    path: '/sing-up',
    component: SingUpComponent
  },
  {
    path: '/sing-out',
    component: SingOutComponent
  },
  {
    path: '/recover-password',
    component: RecoverPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
