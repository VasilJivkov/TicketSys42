
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsResolver } from '../core/user.details.resolver';
import { NotAuthGuardService } from '../route-guards/not-auth-guard.service';
import { UserPageGuardService } from '../route-guards/user-page-guard.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const ROUTES: Routes = [
  { path: ':username', resolve: { 'object': UserDetailsResolver }, component: ProfilePageComponent, canActivate: [NotAuthGuardService, UserPageGuardService]},
];
