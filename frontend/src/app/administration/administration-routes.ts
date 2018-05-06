
import { Routes } from '@angular/router';
import { RoleGuardService } from '../route-guards/role-guard.service';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { ListLogsComponent } from './list-logs/list-logs.component';

export const ROUTES: Routes = [
  { path: ':company/employees', component: ListEmployeesComponent, canActivate: [RoleGuardService] },
  { path: ':company/logs', component: ListLogsComponent, canActivate: [RoleGuardService] },
];
