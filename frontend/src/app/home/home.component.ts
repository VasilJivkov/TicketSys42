import { Component, OnInit, Injectable } from '@angular/core';
import { TicketsService } from '../core/tickets.service';
import { Ticket } from '../models/ticket';
import { Company } from '../models/company';
import {CompaniesService} from "../core/companies.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ TicketsService, CompaniesService]
})

@Injectable()
export class HomeComponent implements OnInit {
    private tickets: Ticket[];
    private companies : Company[];
    constructor(
      private ticketsServices: TicketsService ,
                private companyService: CompaniesService
    ) { }

  ngOnInit() {
      this.ticketsServices.getAll().subscribe(data => this.tickets = data);
      this.companyService.getAll().subscribe(data =>this.companies = data);
  }
}
