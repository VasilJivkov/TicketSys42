import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { DecodedToken } from '../../models/users/DecodedToken';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private user: DecodedToken;
  private isAuth: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {
      this.auth.user.subscribe((user: DecodedToken) => this.user = user);
      this.auth.isAuth.subscribe(x=>this.isAuth = x);
  }

  // isAuth(): boolean {
  //   console.log(this.user);
  //   return this.auth.isAuthenticated();
  // }

  logout(): void {
      this.auth.logout();
  }
}
