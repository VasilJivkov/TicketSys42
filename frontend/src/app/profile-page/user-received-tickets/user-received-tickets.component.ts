import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-received-tickets',
  templateUrl: './user-received-tickets.component.html',
  styleUrls: ['./user-received-tickets.component.css']
})
export class UserReceivedTicketsComponent implements OnInit {
  private receivedTickets: Ticket[];
  private dataSource;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator

  public displayedColumns = ['id', 'title', 'description', 'deadline', 'createdAt', 'status', 'project', 'requester'];

  constructor(private matTable: MatTableModule, private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.receivedTickets = this.acRoute.snapshot.data['object'].receivedTickets;
    this.dataSource = new MatTableDataSource(this.receivedTickets);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public searchTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }
}
