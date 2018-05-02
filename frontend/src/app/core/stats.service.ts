import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { Stats } from '../models/stats';
// import { DisplayType } from '../models/display-type.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

@Injectable()
export class StatsService {

  stats: Stats[];
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<Stats[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}`).map(x => <Stats[]>(x));
  }
}
