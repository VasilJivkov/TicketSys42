import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { ICompanyEmployeesResponse } from '../models/responses/company-employees-res';
import { ICompanyLogsResponse } from '../models/responses/company-logs-res';

@Injectable()
export class AdministrationService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  public getEmployeesByCompanyName(title: string): Observable<ICompanyEmployeesResponse> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/${title}/employees`).map((x) => x as ICompanyEmployeesResponse);
  }

  public getLogsByCompanyName(title: string): Observable <ICompanyLogsResponse> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/${title}/logs`).map((x) => x as ICompanyLogsResponse);
  }

}
