
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './route-guards/auth-guard.service';
import { NotAuthGuardService } from './route-guards/not-auth-guard.service';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'ticket', loadChildren: './ticket/ticket.module#TicketModule', canActivate: [NotAuthGuardService]},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivate: [AuthGuardService]},
  { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule' },
  { path: 'project', loadChildren: './project/project.module#ProjectModule' },
  { path: 'company', loadChildren: './company/company.module#CompanyModule' },
  { path: 'user', loadChildren: './profile-page/profile-page.module#ProfilePageModule' },
  { path: '**', redirectTo: '/home'/* component: NotFoundComponent */ },
];
