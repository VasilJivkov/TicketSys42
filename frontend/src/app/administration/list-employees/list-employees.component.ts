import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTableModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ICompanyEmployeesResponse } from '../../models/responses/company-employees-res';
import { IUserInfo } from '../../models/users/user-info';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeesComponent implements OnInit {
  public displayedColumns = ['id', 'username', 'email', 'firstName', 'lastName', 'nickname', 'role'];
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  private employees: IUserInfo[] = [];
  private dataSource;

  constructor(
    private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private matTable: MatTableModule,
    ) {}

  public ngOnInit(): void {
    const companyTitle = this.activatedRoute.snapshot.params.company;

    this.employeesService.getByCompanyName(companyTitle)
      .subscribe((res: ICompanyEmployeesResponse) => {
        this.employees = res.employees;

        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);
      });

  }

  public searchTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }
}
