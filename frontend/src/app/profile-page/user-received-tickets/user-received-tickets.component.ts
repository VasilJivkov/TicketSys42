import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTableModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ITicket } from '../../models/ticket';

@Component({
  selector: 'app-user-received-tickets',
  templateUrl: './user-received-tickets.component.html',
  styleUrls: ['./user-received-tickets.component.css'],
})

export class UserReceivedTicketsComponent implements OnInit {
  public displayedColumns = ['id', 'title', 'description', 'deadline', 'createdAt', 'status', 'project', 'requester'];
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  private receivedTickets: ITicket[];
  private dataSource;

  constructor(private matTable: MatTableModule, private acRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.receivedTickets = this.acRoute.snapshot.data.object.receivedTickets;
    this.dataSource = new MatTableDataSource(this.receivedTickets);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public searchTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }
}
