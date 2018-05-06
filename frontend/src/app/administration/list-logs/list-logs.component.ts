import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTableModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ILog } from '../../models/log';
import { ICompanyLogsResponse } from '../../models/responses/company-logs-res';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'app-list-logs',
  templateUrl: './list-logs.component.html',
  styleUrls: ['./list-logs.component.css'],
})
export class ListLogsComponent implements OnInit {
  public displayedColumns = ['id', 'title', 'createdAt'];
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  private dataSource;
  private companyLogs: ILog[] = [];
  constructor(
    private administrationService: AdministrationService,
    private activatedRoute: ActivatedRoute,
    private matTable: MatTableModule,
  ) {}

  public ngOnInit(): void {
    const companyTitle = this.activatedRoute.snapshot.params.company;

    this.administrationService.getLogsByCompanyName(companyTitle)
      .subscribe((res: ICompanyLogsResponse) => {
        this.companyLogs = res.logs;

        this.dataSource = new MatTableDataSource(this.companyLogs);
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });

  }

  public searchTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }
}
