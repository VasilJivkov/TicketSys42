import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { CompanyDetails } from '../models/company.details';
import { CompanyEmployeesResponse } from '../models/responses/company-employees-res';

@Injectable()
export class EmployeesService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getByCompanyName(title: string): Observable<CompanyEmployeesResponse> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/${title}/employees`).map(x => <CompanyEmployeesResponse>(x));
  }
}
