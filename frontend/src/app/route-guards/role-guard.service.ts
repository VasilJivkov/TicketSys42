import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { IDecodedToken } from '../models/users/DecodedToken';

@Injectable()
export class RoleGuardService implements CanActivate {
  private user: IDecodedToken;

  constructor(private auth: AuthService) {
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);
  }

  public canActivate(): boolean {
    if (this.user.role === 'Admin') {
      return true;
    }
    return false;
  }

}
