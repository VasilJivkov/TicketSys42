import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialSharedModule } from '../shared/material-shared.module';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ROUTES } from './profile-page-routes';
import { ProfilePageService } from './profile-page.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UpdateUserDetailsComponent } from './update-user-details/update-user-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserIssuedTicketsComponent } from './user-issued-tickets/user-issued-tickets.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { UserReceivedTicketsComponent } from './user-received-tickets/user-received-tickets.component';
import { UserDetailsResolver } from './user.details.resolver';

@NgModule({
  imports: [
    CommonModule,
    MaterialSharedModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    ProfilePageComponent,
    UserIssuedTicketsComponent,
    ChangePasswordComponent,
    UpdateUserDetailsComponent,
    UserDetailsComponent,
    UserReceivedTicketsComponent,
    UserProjectsComponent,
  ],
  providers: [
    ProfilePageService,
    UserDetailsResolver,
  ],
})
export class ProfilePageModule { }
