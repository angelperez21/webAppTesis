import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SignInUpRoutingModule } from './sign-in-up-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RestoreComponent } from './restore/restore.component';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    RestoreComponent
  ],
  imports: [
    CommonModule,
    SignInUpRoutingModule,
    SharedModule,
  ]
})
export class SignInUpModule { }
