
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company.details.component';
import { CompanyPageGuardService } from '../route-guards/company-page-guard.service';

export const ROUTES: Routes = [
  { path: ':company', component: CompanyDetailsComponent, canActivate: [CompanyPageGuardService]},
];
