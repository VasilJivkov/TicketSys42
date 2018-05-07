import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../../core/auth.service';
import { ICompanyProjects } from '../../models/responses/company-projects-res';
import { IDecodedToken } from '../../models/users/DecodedToken';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-company-projects',
  templateUrl: './company-projects.component.html',
  styleUrls: ['./company-projects.component.css'],
})
export class CompanyProjectsComponent implements OnInit {
  public companyProjects: ICompanyProjects[];
  public user: IDecodedToken;
  public dataSource;
  public displayedColumns = ['id', 'title', 'description'];
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
  ) {}

  public ngOnInit(): void {
    this.authService.user.subscribe((user: IDecodedToken) => {
      this.user = user;
    });

    this.projectService.getCompanyProjects(this.user.company).subscribe((data) => {
      this.companyProjects = data;
      this.companyProjects.forEach((project) => {
        project.users.forEach((userInProject) => {
          if (userInProject.id === this.user.sub) {
            project.partOfProject = true;
          }
        });
      });
      this.dataSource = new MatTableDataSource(this.companyProjects);
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });

  }

  public searchInTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }

}
