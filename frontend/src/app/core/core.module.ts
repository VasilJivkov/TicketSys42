import { TicketsService } from './tickets.service';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from '../config/app.config';
import { UserPageService } from './user-page.service';
import { UserDetailsResolver } from './user.details.resolver';


@NgModule({
  imports: [],
  providers: [
    AppConfig,
    TicketsService,
    AuthService,
    UserPageService,
    UserDetailsResolver,
    // { provide: TicketsService, useClass: TicketsService },
    // { provide: AuthService, useClass: AuthService },
  ]
})
export class CoreModule {}
