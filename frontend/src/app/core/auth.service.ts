import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../models/users/user';
import { AppConfig } from './../config/app.config';

@Injectable()
export class AuthService {
  public user = new BehaviorSubject<object>({});
  public isAuth = new BehaviorSubject<boolean>(false);

  constructor(
    private appConfig: AppConfig,
    private http: HttpClient,
    private jwtService: JwtHelperService,
    private router: Router,
    ) { }

  public register(user: IUser, newCompany: boolean): Observable<object> {
    return this.http.post(`${this.appConfig.apiUrl}/register`, {user, newCompany});
  }

  public login(user: IUser): Observable<object> {
    return this.http.post(`${this.appConfig.apiUrl}/login`, user);
  }

  public isAuthenticated(): boolean {
    const token = this.jwtService.tokenGetter();
    const decoded = this.jwtService.decodeToken(token);
    const isLogged = !!token && !this.jwtService.isTokenExpired(token) && decoded.iss === this.appConfig.jwtIssuer;

    this.isAuth.next(isLogged);
    return isLogged;
  }

  public getUser(): void {
    if (this.isAuthenticated()) {
      const token = this.jwtService.tokenGetter();
      const decodedToken = this.jwtService.decodeToken(token);
      this.user.next(decodedToken);
    } else {
      this.user.next({});
    }
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.user.next({});
    this.isAuth.next(false);
    this.router.navigate(['/home']);
  }
}
