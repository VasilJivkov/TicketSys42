import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource, MatTableModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { IProjectPageResponse } from '../../models/responses/project-page-res';
import { ITicket } from '../../models/ticket';
import { IDecodedToken } from '../../models/users/DecodedToken';
import { IProject } from '../../models/users/project';
import { IUserInfo } from '../../models/users/user-info';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  public displayedColumns = ['id', 'username', 'role'];
  private projectTickets: ITicket[] = [];
  private dataSource;

  private user: IDecodedToken;
  private projectTitle: string;
  private projectInfo: IProject;
  private projectUsers: IUserInfo[];
  private filteredUsers: string[];
  private userBelongs;

  private inviteUserForm: FormGroup;

  private changeOwnerForm: FormGroup;

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private matTable: MatTableModule,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);
    this.projectTitle = this.activatedRoute.snapshot.params.projectTitle;

    this.projectService.getProjectByTitle(this.projectTitle).subscribe((res: IProjectPageResponse) => {
      this.projectInfo = res.projectInfo;
      this.projectUsers = res.projectUsers;
      const companyUsers = res.companyUsers;

      this.filteredUsers = companyUsers.map((user) => {
        const findUser = this.projectUsers.find((projectUser) => projectUser.id === user.id);
        if (findUser) {
          return null;
        } else {
          return user.username;
        }
      });
      this.filteredUsers = this.filteredUsers.filter((user) => user !== null);

      this.userBelongs = this.projectUsers.find((user) => user.id === this.user.sub);

      this.dataSource = new MatTableDataSource(this.projectUsers);
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });

    this.inviteUserForm = this.formBuilder.group({
      userToInvite: ['', Validators.required],
    });

    this.changeOwnerForm = this.formBuilder.group({
      userToPromote: ['', Validators.required],
    });
  }

  public searchTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }

  private invite(inviteForm: NgForm): void {
    if (inviteForm.valid) {
      const userToInvite = inviteForm.value.userToInvite;
      this.projectService.inviteUser(userToInvite, this.projectInfo.id).subscribe(
        (res) => {
          this.ngOnInit();
          this.openSnackBar(`User ${userToInvite}, successfully invited.`, 'OK');
          this.inviteUserForm.reset();
        });
    }
  }

  private promote(promoteForm: NgForm): void {
    if (promoteForm.valid) {
      const userToPromote = promoteForm.value.userToPromote;
      this.projectService.promoteUser(userToPromote.id, this.projectInfo.id).subscribe(
        (res) => {
          this.ngOnInit();
          this.openSnackBar(`User ${userToPromote.username}, successfully promoted.`, 'OK');
          this.inviteUserForm.reset();
        });
    }
  }

  private leaveProject(): void {
    this.projectService.leaveProject(this.user.sub, this.projectInfo.id).subscribe(
      (res) => {
        this.router.navigate(['/', '/project', '/all']);
      });
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
