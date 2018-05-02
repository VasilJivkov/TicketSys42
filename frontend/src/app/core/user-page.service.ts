import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import { Injectable, OnInit } from '@angular/core';
// import { DisplayType } from '../models/display-type.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

@Injectable()
export class UserPageService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  getUserInfo(username: string): Observable<Object> {
      return this.http.get(`${this.appConfig.apiUrl}/user/${username}`);
  }

  updateUserInfo(userInfo){
    return this.http.post(`${this.appConfig.apiUrl}/user/${userInfo.username}`, userInfo);
  }
}
