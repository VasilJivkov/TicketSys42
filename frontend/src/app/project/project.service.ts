import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICompanyProjects } from '../models/responses/company-projects-res';
import { IProjectPageResponse } from '../models/responses/project-page-res';
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

  public getProjectByTitle(title: string): Observable <IProjectPageResponse> {
    return this.http.get(`${this.appConfig.apiUrl}/project/${title}`).map((x) => x as IProjectPageResponse);
  }

  public inviteUser(username: string, projectId: number): Observable<object> {
    return this.http.post(`${this.appConfig.apiUrl}/project/invite`, {username, projectId});
  }

  public leaveProject(userId: number, projectId: number): Observable<object> {
    return this.http.post(`${this.appConfig.apiUrl}/project/leave`, {userId, projectId});
  }

  public getCompanyProjects(companyTitle: string): Observable < ICompanyProjects[] > {
    return this.http.get(`${this.appConfig.apiUrl}/project/company/${companyTitle}`).map((x) => x as ICompanyProjects[]);
  }

  public promoteUser(userId: number, projectId: number): Observable<object> {
    return this.http.post(`${this.appConfig.apiUrl}/project/promote`, {userId, projectId});
  }

}
