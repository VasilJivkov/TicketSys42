
import { Routes } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { ListLogsComponent } from './list-logs/list-logs.component';

export const ROUTES: Routes = [
  { path: ':company/employees', component: ListEmployeesComponent},
  { path: ':company/logs', component: ListLogsComponent},
];
