import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialSharedModule } from '../shared/material-shared.module';
import { SharedModule } from '../shared/shared.module';
import { ROUTES } from './administration-routes';
import { AdministrationService } from './administration.service';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { ListLogsComponent } from './list-logs/list-logs.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialSharedModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [ListEmployeesComponent, ListLogsComponent],
  providers: [AdministrationService],
})
export class AdministrationModule { }
