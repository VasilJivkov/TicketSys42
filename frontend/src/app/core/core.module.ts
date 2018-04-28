import { TicketsService } from './tickets.service';
import { AuthService } from './auth.service';
import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    AppConfig
} from '../config/app.config';



@NgModule({
    imports: [],
    providers: [
        // Shorthand
        AppConfig,
        TicketsService,
        AuthService,
        // { provide: TicketsService, useClass: TicketsService },
        // { provide: AuthService, useClass: AuthService },
    ]
})
export class CoreModule {}
