import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { ICompanyDetails } from '../models/company.details';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  public getByCompanyName(title: string): Observable<ICompanyDetails> {
    return this.http.get(`${this.appConfig.apiUrl}/${title}`).map((x) => x as ICompanyDetails);
  }

  public getCompanies(): Observable<object> {
    return this.http.get(`${this.appConfig.apiUrl}/register`);
  }
}
