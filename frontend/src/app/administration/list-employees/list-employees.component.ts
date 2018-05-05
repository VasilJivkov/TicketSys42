import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../core/employees.service';
import { ActivatedRoute } from '@angular/router';
import { CompanyEmployeesResponse } from '../../models/responses/company-employees-res';
import { UserInfo } from '../../models/users/user-info';
import { MatSort, MatPaginator, MatTableModule, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  private employees: UserInfo[] = [];
  private dataSource;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator

  constructor(private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private matTable: MatTableModule) { }

    public displayedColumns = ['id', 'username', 'email', 'firstName', 'lastName', 'nickname', 'role'];
    
  ngOnInit() {
    const companyTitle = this.activatedRoute.snapshot.params.company;
    
    this.employeesService.getByCompanyName(companyTitle)
      .subscribe((res: CompanyEmployeesResponse) => {
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
