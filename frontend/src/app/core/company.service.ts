import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { CompanyDetails } from '../models/company.details';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  getByCompanyName(title: string): Observable<CompanyDetails> {
    return this.http.get(`${this.appConfig.apiUrl}/${title}`).map(x => <CompanyDetails>(x));
  }

  getCompanies(): Observable<Object> {
    return this.http.get(`${this.appConfig.apiUrl}/register`);
  }
}
