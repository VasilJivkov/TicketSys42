import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { SharedModule } from '../shared';
import { BrowserModule } from '@angular/platform-browser';
import { UserIssuedTicketsComponent } from './user-issued-tickets/user-issued-tickets.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateUserDetailsComponent } from './update-user-details/update-user-details.component';
import { UpdateComponent } from './update/update.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  declarations: [ProfilePageComponent, UserIssuedTicketsComponent, ChangePasswordComponent, UpdateUserDetailsComponent, UpdateComponent, UserDetailsComponent]
})
export class ProfilePageModule { }
