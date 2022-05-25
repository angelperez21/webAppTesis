import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignOutComponent } from './authentication/sign-out/sign-out.component';
import { PasswdRestoreComponent } from './authentication/passwd-restore/passwd-restore.component';
import { LabelingComponent } from './content/labeling/labeling.component';
import { RelaxComponent } from './content/relax/relax.component';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    PasswdRestoreComponent,
    LabelingComponent,
    RelaxComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ModulesModule { }
