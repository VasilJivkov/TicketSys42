import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTableModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ITicket } from '../../models/ticket';
@Component({
  selector: 'app-user-issued-tickets',
  templateUrl: './user-issued-tickets.component.html',
  styleUrls: ['./user-issued-tickets.component.css'],
})
export class UserIssuedTicketsComponent implements OnInit {
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  public displayedColumns = ['id', 'title', 'description', 'deadline', 'createdAt', 'status', 'project', 'assignee'];
  private issuedTickets: ITicket[] = [];
  private dataSource;
  constructor(private matTable: MatTableModule, private acRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.issuedTickets = this.acRoute.snapshot.data.object.issuedTickets;
    this.dataSource = new MatTableDataSource(this.issuedTickets);
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  public searchTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }
}
