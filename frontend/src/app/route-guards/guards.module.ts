import { NgModule } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { AuthGuardService } from './auth-guard.service';
import { CompanyPageGuardService } from './company-page-guard.service';
import { NotAuthGuardService } from './not-auth-guard.service';
import { RoleGuardService } from './role-guard.service';
import { UserPageGuardService } from './user-page-guard.service';

@NgModule({
  imports: [],
  providers: [
    AppConfig,
    AuthGuardService,
    RoleGuardService,
    UserPageGuardService,
    NotAuthGuardService,
    CompanyPageGuardService,
  ],
})
export class GuardsModule {}
