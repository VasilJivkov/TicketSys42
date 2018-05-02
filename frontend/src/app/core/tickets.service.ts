import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { Ticket } from '../models/ticket';
// import { DisplayType } from '../models/display-type.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

@Injectable()
export class TicketsService {

  tickets: Ticket[];
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(`${this.appConfig.apiUrl}`);
  }

}
