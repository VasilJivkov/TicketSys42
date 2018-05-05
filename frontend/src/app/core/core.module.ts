import { StatsService } from './stats.service';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from '../config/app.config';
import { UserPageService } from './user-page.service';
import { UserDetailsResolver } from './user.details.resolver';
import { CompanyService } from './company.service';
import { EmployeesService } from './employees.service';


@NgModule({
  imports: [],
  providers: [
    AppConfig,
    AuthService,
    CompanyService,
    StatsService,
    UserPageService,
    UserDetailsResolver,
    EmployeesService,
    // { provide: TicketsService, useClass: TicketsService },
    // { provide: AuthService, useClass: AuthService },
  ]
})
export class CoreModule {}
