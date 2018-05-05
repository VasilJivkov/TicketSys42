import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { IDecodedToken } from '../models/users/DecodedToken';

@Component({
    selector: 'app-layout-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private user: IDecodedToken;
  private isAuth: boolean;

  constructor(private auth: AuthService) {}

  public ngOnInit(): void {
      this.auth.user.subscribe((user: IDecodedToken) => this.user = user);
      this.auth.isAuth.subscribe((x) => this.isAuth = x);
  }

  public logout(): void {
      this.auth.logout();
  }
}
