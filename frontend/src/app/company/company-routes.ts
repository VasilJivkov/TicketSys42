
import { Routes } from '@angular/router';
import { CompanyPageGuardService } from '../route-guards/company-page-guard.service';
import { CompanyDetailsComponent } from './company-details/company.details.component';

export const ROUTES: Routes = [
  { path: ':company', component: CompanyDetailsComponent, canActivate: [CompanyPageGuardService]},
];
