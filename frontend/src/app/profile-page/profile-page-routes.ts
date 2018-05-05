import { Routes } from '@angular/router';
import { NotAuthGuardService } from '../route-guards/not-auth-guard.service';
import { UserPageGuardService } from '../route-guards/user-page-guard.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserDetailsResolver } from './user.details.resolver';

export const ROUTES: Routes = [{
  path: ':username',
  resolve: {
    object: UserDetailsResolver,
  },
  component: ProfilePageComponent,
  canActivate: [NotAuthGuardService, UserPageGuardService],
}];
