import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { IStats } from '../models/stats';

@Injectable()
export class StatsService {

  private stats: IStats[];
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  public getAll(): Observable<IStats[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}`).map((x) => x as IStats[]);
  }
}
