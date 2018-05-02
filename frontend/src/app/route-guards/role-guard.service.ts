import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { DecodedToken } from '../models/users/DecodedToken';

@Injectable()
export class RoleGuardService implements CanActivate{
  private user: DecodedToken;

  canActivate(): boolean {
    if (this.user.role === "Admin") {
      return true;
    }
    return false;
  }

  constructor(private auth: AuthService) {
  this.auth.user.subscribe((user: DecodedToken) => this.user = user);
  }

}
