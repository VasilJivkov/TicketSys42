import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../models/users/project';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {
  private userProjects: Project[];
  private dataSource;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator
  public displayedColumns = ['id', 'title', 'description', 'deadline', 'createdAt', 'owner'];
  constructor(private matTable: MatTableModule, private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userProjects = this.acRoute.snapshot.data['object'].userProjects;
    this.dataSource = new MatTableDataSource(this.userProjects);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public searchTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }
}
