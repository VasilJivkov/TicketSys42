import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './create-ticket.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialSharedModule } from '../shared/material-shared.module';
import { SharedModule } from '../shared/shared.module';
import { CreateTicketService } from './create-ticket.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MaterialSharedModule,
    SharedModule,
  ],
  declarations: [CreateTicketComponent],
  providers: [CreateTicketService],
})
export class CreateTicketModule { }
