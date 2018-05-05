import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTableModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../models/users/project';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css'],
})

export class UserProjectsComponent implements OnInit {
  public displayedColumns = ['id', 'title', 'description', 'deadline', 'createdAt', 'owner'];

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  private userProjects: IProject[];
  private dataSource;

  constructor(private matTable: MatTableModule, private acRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.userProjects = this.acRoute.snapshot.data.object.userProjects;
    this.dataSource = new MatTableDataSource(this.userProjects);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public searchTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }
}
