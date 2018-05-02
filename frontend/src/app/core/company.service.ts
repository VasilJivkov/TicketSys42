import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import {CompanyInfo} from "../models/companyInfo";

@Injectable()
export class CompanyService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getById(ID: number): Observable<CompanyInfo> {
    console.log(ID);
    let response =  this.httpClient.get(`${this.appConfig.apiUrl}/company/${ID}`).map(x => <CompanyInfo>(x));
    return response;
  }

  getAll(): Observable<CompanyInfo[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/company`).map(x => <CompanyInfo[]>(x));
  }


}
