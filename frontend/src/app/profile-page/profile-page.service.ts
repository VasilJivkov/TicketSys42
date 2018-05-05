import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { IUserPageResponse } from '../models/responses/user-page-res';
import { IUserInfo } from '../models/users/user-info';

@Injectable()
export class ProfilePageService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  public getUserInfo(username: string): Observable<object> {
      return this.http.get(`${this.appConfig.apiUrl}/user/${username}`);
  }

  public updateUserInfo(userInfo: IUserInfo): Observable<IUserPageResponse> {
    return this.http.post(`${this.appConfig.apiUrl}/user/${userInfo.username}`, userInfo).map((res) => res as IUserPageResponse);
  }
}
