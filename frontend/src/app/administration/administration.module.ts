import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialSharedModule } from '../shared/material-shared.module';
import { SharedModule } from '../shared/shared.module';
import { ROUTES } from './administration-routes';
import { EmployeesService } from './employees.service';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialSharedModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [ListEmployeesComponent],
  providers: [EmployeesService],
})
export class AdministrationModule { }
