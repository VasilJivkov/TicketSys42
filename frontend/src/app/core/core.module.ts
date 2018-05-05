import { NgModule } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { AuthService } from './auth.service';
import { CompanyService } from './company.service';
import { StatsService } from './stats.service';

@NgModule({
  imports: [],
  providers: [
    AppConfig,
    AuthService,
    CompanyService,
    StatsService,
  ],
})
export class CoreModule {}
