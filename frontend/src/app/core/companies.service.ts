import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { Company } from '../models/company';
// import { DisplayType } from '../models/display-type.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

@Injectable()
export class CompaniesService {

  Companies: Company[];
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<Company[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/companies`).map(x => <Company[]>(x));
  }
}
