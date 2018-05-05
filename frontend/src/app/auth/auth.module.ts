import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialSharedModule } from '../shared/material-shared.module';
// import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from './auth-routes';

@NgModule({
  imports: [
    CommonModule,
    // AuthRoutingModule,
    MaterialSharedModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
