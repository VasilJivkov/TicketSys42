import 'rxjs/add/operator/map';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { GetCreateTicketResponse } from '../models/responses/get-create-ticket-res';
import { DecodedToken } from '../models/users/DecodedToken';
import { NgForm } from '@angular/forms';

@Injectable()
export class CreateTicketService {
  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  getProjectsAndUsers(username: string): Observable<GetCreateTicketResponse> {
    return this.http.get(`${this.appConfig.apiUrl}/createTicket?username=${username}`).map(x => <GetCreateTicketResponse>(x));
  }

  createTicket(ticket: NgForm, user: DecodedToken): Observable<Object>{
    return this.http.post(`${this.appConfig.apiUrl}/createTicket`, {ticket, user});
  }
}
