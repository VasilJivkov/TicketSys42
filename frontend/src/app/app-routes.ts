
// import { PhoneDetailsComponent } from './phones/details/phone-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './route-guards/auth-guard.service';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'createTicket', component: CreateTicketComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivate: [AuthGuardService]},
  { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule' },
  { path: 'company', loadChildren: './company/company.module#CompanyModule' },
  { path: 'user', loadChildren: './profile-page/profile-page.module#ProfilePageModule' },
  { path: '**', redirectTo: '/home', /* component: NotFoundComponent */}
];
