import { HttpOptions } from './../models/core/http-options';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppConfig } from './../config/app.config';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { User } from '../models/users/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessToken } from '../models/users/AccessToken';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {  
  public user = new BehaviorSubject<object>({});
  public isAuth = new BehaviorSubject<boolean>(false);

  constructor(private appConfig: AppConfig,
    private http: HttpClient,
    private jwtService: JwtHelperService,
    private router: Router) { }
  register(user: User): Observable<Object> {
    return this.http.post(`${this.appConfig.apiUrl}/register`, user);
  }

  login(user: User): Observable<Object> {
    return this.http.post(`${this.appConfig.apiUrl}/login`, user);
  }

  isAuthenticated(): boolean {
    const token = this.jwtService.tokenGetter();
    const decoded = this.jwtService.decodeToken(token);
    const isLogged = !!token && !this.jwtService.isTokenExpired(token) && decoded.iss === this.appConfig.jwt_issuer;
    this.isAuth.next(isLogged);
    return isLogged;
  }

  getUser(): void {
    if (this.isAuthenticated()){
      const token = this.jwtService.tokenGetter();
      const decodedToken = this.jwtService.decodeToken(token);
      this.user.next(decodedToken);
    } else {
      this.user.next({});
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.user.next({});
    this.isAuth.next(false);
    this.router.navigate(['/home'])
  }
}
