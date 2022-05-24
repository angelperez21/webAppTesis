import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './modules/authentication/sign-up/sign-up.component';
import { SignOutComponent } from './modules/authentication/sign-out/sign-out.component';
import { PasswdRestoreComponent } from './modules/authentication/passwd-restore/passwd-restore.component';
import { LabelingComponent } from './modules/content/labeling/labeling.component';
import { RelaxComponent } from './modules/content/relax/relax.component';
import { LoggedGuard } from './shared/guards/logged.guard';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-out', component: SignOutComponent },
  { path: 'passwd-restore', component: PasswdRestoreComponent },
  {
    path: '',
    component: LabelingComponent,
    canActivate: [LoggedGuard],
    children: [
      { path: 'labeling', component: LabelingComponent },
      { path: 'relax', component: RelaxComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
