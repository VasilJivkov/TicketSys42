
import { Routes } from '@angular/router';
import { RoleGuardService } from '../route-guards/role-guard.service';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

export const ROUTES: Routes = [
  { path: ':company/employees', component: ListEmployeesComponent, canActivate: [RoleGuardService] },
];
