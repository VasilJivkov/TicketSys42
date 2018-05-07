import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTableModule } from '@angular/material';
import { AuthService } from '../core/auth.service';
import { NotificationsService } from '../core/notifications.service';
import { INotification } from '../models/notification';
import { INotificationsRes } from '../models/responses/notifications-res';
import { IDecodedToken } from '../models/users/DecodedToken';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  public displayedColumns = ['id', 'title', 'ProjectId', 'createdAt', 'deleted'];
  private dataSource;

  private notifications: INotification[];
  private user: IDecodedToken;

  constructor(
    private auth: AuthService,
    private matTable: MatTableModule,
    private notificationsService: NotificationsService,
  ) {}

  public ngOnInit(): void {
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);
    this.notificationsService.getUserNotifications(this.user.sub).subscribe(
      (res: INotificationsRes) => {
        this.notifications = res.notifications.filter((notif) => !notif.deleted);

        this.dataSource = new MatTableDataSource(this.notifications);
        this.dataSource.sort = this.sort;
        setTimeout(() => this.dataSource.paginator = this.paginator);

      });
  }

  public searchTable(searchValue: string): void {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    this.dataSource.filter = formattedSearchValue;
  }

  public respond(answer: boolean, projectId: number, notificationId: number): void {
    const body = {
      userId: this.user.sub,
      projectId,
      answer,
      notificationId,
    };
    this.notificationsService.respond(body).subscribe(
      (res) => {
        this.ngOnInit();
      },
    );
  }

  public delete(notificationId: number): void {
    this.notificationsService.deleteNotification(notificationId).subscribe(
      (res) => {
        this.ngOnInit();
      },
    );
  }
}
