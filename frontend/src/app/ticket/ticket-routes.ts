
import { Routes } from '@angular/router';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketComponent } from './ticket/ticket.component';

export const ROUTES: Routes = [
  { path: 'createTicket', component: CreateTicketComponent },
  { path: ':ticketId', component: TicketComponent },
];
