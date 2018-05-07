import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { INotificationsRes } from '../models/responses/notifications-res';

@Injectable()
export class NotificationsService {

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  public getUserNotifications(userId: number): Observable<INotificationsRes> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/notifications/${userId}`).map((x) => x as INotificationsRes);
  }

  public respond(body: object): Observable<object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/invitationResponse`, body);
  }

  public deleteNotification(notificationId: number): Observable<object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/deleteNotification`, {notificationId});
  }
}
