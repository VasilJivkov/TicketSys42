// import { PhoneDetailsComponent } from './phones/details/phone-details.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import {SharedModule} from "./shared";
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './route-guards/auth-guard.service';
import { UserPageGuardService } from './route-guards/user-page-guard.service';
import { NotAuthGuardService } from './route-guards/not-auth-guard.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserDetailsResolver } from './core/user.details.resolver';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
//   {
    // path: 'phones', children: [
    //   { path: '', component: PhoneListComponent, pathMatch: 'full' },
    //   { path: ':brand', component: PhoneDetailsComponent }
    // ]
//   },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'user/:username', component: ProfilePageComponent, resolve: {'object': UserDetailsResolver}, canActivate: [NotAuthGuardService, UserPageGuardService] },
  { path: '**', redirectTo: '/home', /* component: NotFoundComponent */}
];
