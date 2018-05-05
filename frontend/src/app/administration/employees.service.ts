import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { ICompanyEmployeesResponse } from '../models/responses/company-employees-res';

@Injectable()
export class EmployeesService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  public getByCompanyName(title: string): Observable<ICompanyEmployeesResponse> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/${title}/employees`).map((x) => x as ICompanyEmployeesResponse);

  }
}
