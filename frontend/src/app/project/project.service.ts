import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IDecodedToken } from '../models/users/DecodedToken';
import { IProject } from '../models/users/project';
import { AppConfig } from './../config/app.config';

@Injectable()
export class ProjectService {
  constructor(
    private appConfig: AppConfig,
    private http: HttpClient,
    ) { }

  public createProject(user: IDecodedToken, project: IProject): Observable<object> {
    return this.http.post(`${this.appConfig.apiUrl}/createProject`, {user, project});
  }
}
