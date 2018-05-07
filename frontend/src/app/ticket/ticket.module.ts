import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialSharedModule } from '../shared/material-shared.module';
import { SharedModule } from '../shared/shared.module';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { ROUTES } from './ticket-routes';
import { TicketService } from './ticket.service';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialSharedModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [CreateTicketComponent, TicketComponent],
  providers: [TicketService],
})
export class TicketModule { }
