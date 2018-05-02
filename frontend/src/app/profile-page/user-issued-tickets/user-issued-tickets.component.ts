import { Component, OnInit, Input } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { Ticket } from '../../models/ticket';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-issued-tickets',
  templateUrl: './user-issued-tickets.component.html',
  styleUrls: ['./user-issued-tickets.component.css']
})
export class UserIssuedTicketsComponent implements OnInit {
  @Input() private issuedTickets: Ticket[];
  constructor(private matTable: MatTableModule, private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.issuedTickets = this.acRoute.snapshot.data['object'].issuedTickets;
  }

}
