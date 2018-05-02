import { Component, OnInit, Injectable } from '@angular/core';
import { TicketsService } from '../core/tickets.service';
import { Ticket } from '../models/ticket';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit {
    private tickets: Ticket[];
    constructor(private ticketsServices: TicketsService) { }

  ngOnInit() {
      this.ticketsServices.getAll().subscribe((data: Ticket[]) => {this.tickets = data});
  }
}
