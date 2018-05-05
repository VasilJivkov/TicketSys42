import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UserIssuedTicketsComponent } from './user-issued-tickets/user-issued-tickets.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateUserDetailsComponent } from './update-user-details/update-user-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserReceivedTicketsComponent } from './user-received-tickets/user-received-tickets.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { MaterialSharedModule } from '../shared/material-shared.module';
import { SharedModule } from '../shared/shared.module';
import { ROUTES } from './profile-page-routes';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialSharedModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [ProfilePageComponent, UserIssuedTicketsComponent, ChangePasswordComponent, UpdateUserDetailsComponent, UserDetailsComponent, UserReceivedTicketsComponent, UserProjectsComponent]
})
export class ProfilePageModule { }
