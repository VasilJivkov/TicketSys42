
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { RoleGuardService } from '../route-guards/role-guard.service';

export const ROUTES: Routes = [
  { path: ':company/employees', component: ListEmployeesComponent, canActivate: [RoleGuardService] },
];
