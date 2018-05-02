import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from '../config/app.config';
import { AuthGuardService } from './auth-guard.service';
import { RoleGuardService } from './role-guard.service';
import { UserPageGuardService } from './user-page-guard.service';
import { NotAuthGuardService } from './not-auth-guard.service';


@NgModule({
  imports: [],
  providers: [
    AppConfig,
    AuthGuardService,
    RoleGuardService,
    UserPageGuardService,
    NotAuthGuardService,
    // { provide: TicketsService, useClass: TicketsService },
    // { provide: AuthService, useClass: AuthService },
  ]
})
export class GuardsModule {}
