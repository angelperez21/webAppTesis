// Modulos de angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos propios
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingOutComponent } from './sing-out/sing-out.component';


@NgModule({
  declarations: [
    RecoverPasswordComponent,
    SingInComponent,
    SingUpComponent,
    SingOutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
