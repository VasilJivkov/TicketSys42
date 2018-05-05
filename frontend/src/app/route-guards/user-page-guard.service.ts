import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';
import { IDecodedToken } from '../models/users/DecodedToken';

@Injectable()
export class UserPageGuardService implements CanActivate {
  private user: IDecodedToken;
  private requestedUsername: string;

  constructor(private auth: AuthService) {
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable < boolean > | Promise < boolean > {
    if (this.user.username === route.params.username || this.user.role === 'Admin') {
      return true;
    }
    return false;
  }
}
